import { Prisma } from 'prisma/prisma-client'
import { prisma } from '../../lib/prisma'
import { UsersInterfaceRepository } from '../users-interface-repository'

export class PrismaUsersRepository implements UsersInterfaceRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
