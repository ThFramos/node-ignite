import { compare } from 'bcryptjs'
import { User } from 'prisma/prisma-client'
import { UsersInterfaceRepository } from '../repositories/users-interface-repository'
import { InvalidCredentialError } from './errors/invalid-credential-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseReponse {
  user: User
}

export class AuthenticationUseCase {
  constructor(private usersRepositories: UsersInterfaceRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseReponse> {
    const user = await this.usersRepositories.findByEmail(email)

    if (!user) throw new InvalidCredentialError()

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) throw new InvalidCredentialError()

    return {
      user,
    }
  }
}
