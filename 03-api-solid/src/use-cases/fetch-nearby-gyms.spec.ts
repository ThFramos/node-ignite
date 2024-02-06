import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

let gynsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Fetch Nearby Use Case', () => {
  beforeEach(() => {
    gynsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gynsRepository)
  })

  it('should be search gyms near by user', async () => {
    await gynsRepository.create({
      title: 'JS Academy',
      description: '',
      phone: '',
      latitude: -22.902574,
      longitude: -47.068035,
    })
    await gynsRepository.create({
      title: 'TS Academy',
      description: '',
      phone: '',
      latitude: -22.902574,
      longitude: -47.208035,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.902574,
      userLongitude: -47.068035,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Academy' })])
  })
})
