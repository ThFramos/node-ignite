import { Prisma, User } from 'prisma/prisma-client'

export interface usersInterfaceRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
