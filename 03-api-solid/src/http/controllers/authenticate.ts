import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialError } from '../../use-cases/errors/invalid-credential-error'
import { makeAuthenticateUseCase } from '../../use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)


  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })
    console.log({ user })
    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })
    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialError)
      return reply.status(404).send(error.message)
    throw error
  }

}
