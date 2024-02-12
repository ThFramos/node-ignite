import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { GetUserProfileUse } from '../get-user-profile'

export function makeGetUserProfile() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const useCase = new GetUserProfileUse(prismaUsersRepository)

    return useCase
}
