import { it, beforeAll, afterAll, describe, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { execSync } from 'node:child_process';
import { beforeEach } from 'node:test';

describe('Transactions Routes', () => {
  beforeAll(async () => {
    execSync('npm run migrate:latest');
    await app.ready();
  });
  beforeEach(() => {
    execSync('npm run migrate:rollback');
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'frelancer test03',
        type: 'credit',
        amount: 3000,
      })
      .expect(201);
  });
  it('should be able to list all transactions', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new Transaction',
        type: 'credit',
        amount: 3000,
      })
      .expect(201);
    const cookies = response.get('Set-Cookie');

    if (!cookies) {
      throw new Error('Cookie de sessão não foi definido');
    }

    const listTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);

    expect(listTransactions.body?.transactions).toEqual([
      expect.objectContaining({
        title: 'new Transaction',
        amount: 3000,
      }),
    ]);
  });
  it('should be able to get a specific transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new Transaction',
        type: 'credit',
        amount: 3000,
      })
      .expect(201);
    const cookies = response.get('Set-Cookie');

    if (!cookies) {
      throw new Error('Cookie de sessão não foi definido');
    }

    const listTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200);
    const transactionId: string = listTransactions.body.transactions[0].id;
    console.log('🚀 ~ transactionId:', transactionId);

    const getTransaction = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200);

    expect(getTransaction.body.transaction).toEqual(
      expect.objectContaining({
        title: 'new Transaction',
        amount: 3000,
      }),
    );
  });

  it('should be able get the summary', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit Transaction',
        type: 'credit',
        amount: 3000,
      })
      .expect(201);
    const cookies = response.get('Set-Cookie');
    if (!cookies) {
      throw new Error('Cookie de sessão não foi definido');
    }
    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit Transaction',
        type: 'debit',
        amount: 1000,
      })
      .expect(201);

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200);

    expect(summaryResponse.body?.summary).toEqual(
      expect.objectContaining({
        amount: 2000,
      }),
    );
  });
});
