import fastify from 'fastify'
import { database } from './database'

const app = fastify()

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
  const data = await database('transactions').where('amount', 1000).select('*')

  console.log('a', data)
  return 'hello world'
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
