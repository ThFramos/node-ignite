import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { FetchUserCheckInsHistoryUseCaseUseCase } from './fetch-user-check-ins-history'

let checkinRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCaseUseCase

describe('Fetch User Check-ins history Use Case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCaseUseCase(checkinRepository)
  })

  it('should be able to check-ins history', async () => {
    await checkinRepository.create({
      gym_id: `gym-01`,
      user_id: 'user-01',
    })
    await checkinRepository.create({
      gym_id: `gym-02`,
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('should be able to check ins paginated history', async () => {
    for (let index = 1; index <= 25; index++) {
      await checkinRepository.create({
        gym_id: `gym-${index}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(5)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
      expect.objectContaining({ gym_id: 'gym-23' }),
      expect.objectContaining({ gym_id: 'gym-24' }),
      expect.objectContaining({ gym_id: 'gym-25' }),
    ])
  })
})
