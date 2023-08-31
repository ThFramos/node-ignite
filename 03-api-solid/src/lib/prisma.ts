import { PrismaClient } from 'prisma/prisma-client'
import { env } from '../env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
