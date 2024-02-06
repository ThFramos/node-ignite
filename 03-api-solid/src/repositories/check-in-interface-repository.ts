import { CheckIn, Prisma } from 'prisma/prisma-client'

export interface CheckInInterfaceRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  findById(id: string): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn | null>
  getUserCountFromMetrics(userId: string): Promise<number>
  findCheckinOnTheDate(
    userId: string,
    created_at: Date,
  ): Promise<CheckIn | null>
}
