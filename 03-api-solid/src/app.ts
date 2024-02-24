import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRETS
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError)
    return reply
      .code(400)
      .send({ message: 'Validation Error!', issues: error.format() })

  if (env.NODE_ENV === 'dev') {
    console.log(error)
  } else {
    // TODO: here we should log to external  tool like dataDog/NewRelic/Sentry
  }

  return reply.code(500).send({ message: 'Internal Server Error!' })
})
