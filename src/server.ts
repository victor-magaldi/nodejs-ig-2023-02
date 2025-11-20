import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  console.log('hello 11!')
  const data = await knex('sqlite_schema').select('*')
  console.log('a', data)
  return 'hellor world'
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})
