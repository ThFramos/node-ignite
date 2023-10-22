import { CheckIn, Prisma } from 'prisma/prisma-client'

export interface CheckInInterfaceRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findCheckinOnTheDate(
    userId: string,
    created_at: Date,
  ): Promise<CheckIn | null>
}
