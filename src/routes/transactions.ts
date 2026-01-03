import { FastifyInstance } from 'fastify'
import { database } from '../database'
import z from 'zod'

export async function transactionRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { amount, title, type } = createTransactionSchema.parse(req.body)
    await database('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : -amount,
    })
    return reply.status(201).send()
  })

  app.get('/', async (_, reply) => {
    const transactions = await database('transactions').select('*')
    return reply.status(200).send({ transactions })
  })

  app.get('/:id', async (req, reply) => {
    const getTransactionParamSchema = z.object({
      id: z.uuid(),
    })
    const { id } = getTransactionParamSchema.parse(req.params)
    const transaction = await database('transactions')
      .where({ id })
      .select('*')
      .first()

    return reply.status(200).send({ transaction })
  })

  app.get('/summary', async (_, reply) => {
    const summary = await database('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    return reply.status(200).send({ summary })
  })
}
