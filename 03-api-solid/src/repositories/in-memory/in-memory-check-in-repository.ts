import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { CheckIn, Prisma } from 'prisma/prisma-client'
import { CheckInInterfaceRepository } from '../check-in-interface-repository'

export class InMemoryCheckInRepository implements CheckInInterfaceRepository {
  public checkIns: CheckIn[] = []

  async findCheckinOnTheDate(userId: string, created_at: Date) {
    const startOfTheDay = dayjs(created_at).startOf('date')
    const endtOfTheDay = dayjs(created_at).endOf('date')

    const checkinOnSameDay = this.checkIns.find((checkIn) => {
      const checkInDay = dayjs(checkIn.created_at)
      const isOnSameDay =
        checkInDay.isAfter(startOfTheDay) && checkInDay.isBefore(endtOfTheDay)

      return checkIn.user_id === userId && isOnSameDay
    })

    if (!checkinOnSameDay) return null

    return checkinOnSameDay
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find((item) => item.id === id)

    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async getUserCountFromMetrics(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async save(checkIn: CheckIn) {
    const foundCheckin = this.checkIns.findIndex(
      (item) => item.id === checkIn.id,
    )

    if (foundCheckin >= 0) {
      this.checkIns[foundCheckin] = checkIn
    }
    return checkIn
  }
}
