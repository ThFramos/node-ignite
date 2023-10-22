import { User } from 'prisma/prisma-client'
import { UsersInterfaceRepository } from '../repositories/users-interface-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseReponse {
  user: User
}

export class GetUserProfileUse {
  constructor(private usersRepositories: UsersInterfaceRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseReponse> {
    const user = await this.usersRepositories.findById(userId)

    if (!user) throw new ResourceNotFoundError()

    return {
      user,
    }
  }
}
