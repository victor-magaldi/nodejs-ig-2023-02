import { it, beforeAll, afterAll, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'frelancer test03',
        type: 'credit',
        amount: 3000,
      })
      .expect(201)
  })
  it('should be able to list all transactions', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new Transaction',
        type: 'credit',
        amount: 3000,
      })
      .expect(201)
    const cookies = response.get('Set-Cookie')

    if (!cookies) {
      throw new Error('Cookie de sessão não foi definido')
    }

    const listTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactions.body?.transactions).toEqual([
      expect.objectContaining({
        title: 'new Transaction',
        amount: 3000,
      }),
    ])
  })
})
