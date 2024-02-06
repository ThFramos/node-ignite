import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gynsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gynsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gynsRepository)
  })

  it('should be create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Academy',
      description: '',
      phone: '',
      latitude: -22.902574,
      longitude: -47.068035,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
