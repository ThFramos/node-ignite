import { Prisma } from 'prisma/prisma-client'
import { prisma } from '../../lib/prisma'
import { UsersInterfaceRepository } from '../users-interface-repository'

export class PrismaUsersRepository implements UsersInterfaceRepository {
  findById(id: string): Promise<{
    id: string
    nome: string
    email: string
    password_hash: string
    created_at: Date
  } | null> {
    throw new Error('Method not implemented.')
  }

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
