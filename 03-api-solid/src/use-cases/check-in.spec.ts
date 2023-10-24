import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'

let checkinRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkinRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gymId',
      title: 'JS Academy',
      description: '',
      phone: '',
      latitude: new Decimal(-22.902574),
      longitude: new Decimal(-47.0680352),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId',
      userId: 'userId',
      userLatitude: -22.902574,
      userLongitude: -47.0680352,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 7, 2, 8, 0, 0))

    await sut.execute({
      gymId: 'gymId',
      userId: 'userId',
      userLatitude: -22.902574,
      userLongitude: -47.0680352,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gymId',
        userId: 'userId',
        userLatitude: -22.902574,
        userLongitude: -47.0680352,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but not in the same day', async () => {
    vi.setSystemTime(new Date(2023, 7, 2, 8, 0, 0))

    await sut.execute({
      gymId: 'gymId',
      userId: 'userId',
      userLatitude: -22.902574,
      userLongitude: -47.0680352,
    })
    vi.setSystemTime(new Date(2023, 7, 3, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gymId',
      userId: 'userId',
      userLatitude: -22.902574,
      userLongitude: -47.0680352,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be not able to check in on distance Gym', async () => {
    gymsRepository.items.push({
      id: 'gymId-2',
      title: 'JS Academy',
      description: '',
      phone: '',
      latitude: new Decimal(-22.8779828),
      longitude: new Decimal(-47.0524141),
    })

    await expect(async () => {
      await sut.execute({
        gymId: 'gymId-2',
        userId: 'userId',
        userLatitude: -22.902574,
        userLongitude: -47.0680352,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
