
import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { register } from './controllers/register'
import { profile } from './controllers/profile'
import { verifyJWT } from './middleware/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)

  /* authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
