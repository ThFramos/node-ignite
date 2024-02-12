import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticationUseCase } from '../authentication'

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new AuthenticationUseCase(prismaUsersRepository)

  return useCase
}
