import { Prisma, User } from 'prisma/prisma-client'

export interface UsersInterfaceRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
