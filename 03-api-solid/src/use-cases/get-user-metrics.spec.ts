import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory/in-memory-check-in-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkinRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get user Count from metrics Use Case', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkinRepository)
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

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
