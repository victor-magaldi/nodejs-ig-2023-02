import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  console.log('hello!')
  return "hellor world"
})

app.listen({ port: 3333 }).then(() => { console.log("HTTP server running") })