import { FastifyInstance } from 'fastify'
import { database } from '../database'

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
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
