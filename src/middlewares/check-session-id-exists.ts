import { FastifyRequest, FastifyReply } from 'fastify'

export async function checkSessionIdExists(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = req.cookies.sessionId
  if (!sessionId && req.method === 'GET') {
    return reply.status(401).send({ error: 'Unauthorized.' })
  }
}
