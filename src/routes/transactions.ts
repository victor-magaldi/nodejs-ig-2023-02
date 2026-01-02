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

  app.get('/', async () => {
    console.log('hello 11!')
    // const data = await database('transactions')
    //   .insert({
    //     id: crypto.randomUUID(),
    //     title: 'teste',
    //     amount: 1000,
    //   })
    //   .returning('*')
    // const data = await database('transactions').select('*')
    const data = await database('transactions')
      .where('amount', 1000)
      .select('*')

    console.log('as', data)
    return 'hello world'
  })
}
