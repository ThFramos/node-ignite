import { CheckIn } from 'prisma/prisma-client'
import { CheckInInterfaceRepository } from '../repositories/check-in-interface-repository'
import { GymsInterfaceRepository } from '../repositories/gyms-interface-repository'
import { getDistanceBetweenCoordinates } from '../utils/get-distance-between-coordinates'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInReponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepositories: CheckInInterfaceRepository,
    private gymsRepositories: GymsInterfaceRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLongitude,
    userLatitude,
  }: CheckInRequest): Promise<CheckInReponse> {
    const gym = await this.gymsRepositories.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_KILOMETERS_DISTANCE = 0.1
    if (distance > MAX_KILOMETERS_DISTANCE) {
      throw new ResourceNotFoundError()
    }

    const chekInOnSameDay = await this.checkInRepositories.findCheckinOnTheDate(
      userId,
      new Date(),
    )

    if (chekInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepositories.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
