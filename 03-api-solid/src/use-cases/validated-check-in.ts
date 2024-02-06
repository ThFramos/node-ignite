import dayjs from 'dayjs'
import { CheckIn } from 'prisma/prisma-client'
import { CheckInInterfaceRepository } from '../repositories/check-in-interface-repository'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ValidatedCheckInRequest {
  checkInId: string
}

interface ValidatedCheckInReponse {
  checkIn: CheckIn
}

export class ValidatedCheckInUseCase {
  constructor(private checkInRepositories: CheckInInterfaceRepository) {}

  async execute({
    checkInId,
  }: ValidatedCheckInRequest): Promise<ValidatedCheckInReponse> {
    const checkIn = await this.checkInRepositories.findById(checkInId)
    const LIMITE_MINUTES_CHECKIN = 20

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const rangeInMinutesFromCheckinInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (rangeInMinutesFromCheckinInCreation > LIMITE_MINUTES_CHECKIN) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date()

    this.checkInRepositories.save(checkIn)

    return {
      checkIn,
    }
  }
}
