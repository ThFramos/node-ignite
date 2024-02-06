import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberCheckinsError } from './errors/max-number-checkins-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidatedCheckInUseCase } from './validated-check-in'

let checkinRepository: InMemoryCheckInRepository
let sut: ValidatedCheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInRepository()
    sut = new ValidatedCheckInUseCase(checkinRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validated check-in', async () => {
    const createdCheckIn = await checkinRepository.create({
      gym_id: 'gymId',
      user_id: 'userId',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validated an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistid',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the checkin after to 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 12, 10))

    const createdCheckIn = await checkinRepository.create({
      gym_id: 'gymId',
      user_id: 'userId',
    })
    const minutsAdvanceOfCheckin21 = 1000 * 60 * 21
    vi.advanceTimersByTime(minutsAdvanceOfCheckin21)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
