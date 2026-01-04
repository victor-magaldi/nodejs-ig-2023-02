import { FastifyInstance } from 'fastify'
import { database } from '../database'
import z from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { amount, title, type } = createTransactionSchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = crypto.randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      })
    }

    await database('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : -amount,
      session_id: sessionId,
    })
    return reply.status(201).send()
  })

  app.get('/', { preHandler: checkSessionIdExists }, async (req, reply) => {
    const { sessionId } = req.cookies

    const transactions = await database('transactions')
      .where('session_id', sessionId)
      .select('*')
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

  app.get('/summary', async (req, reply) => {
    const summary = await database('transactions')
      .sum('amount', { as: 'amount' })
      .first()

    const sessionId = req.cookies.sessionId
    console.log('🚀 ~ transactionRoutes ~ sessionId:', sessionId)

    return reply.status(200).send({ summary })
  })
}
