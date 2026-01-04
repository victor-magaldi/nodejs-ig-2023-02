import { test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
  await app.ready()
})
afterAll(async () => {
  await app.close()
})
test('User Should to create a new transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'frelancer test03',
      type: 'credit',
      amount: 3000,
    })
    .expect(201)
})
