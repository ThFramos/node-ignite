import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gynsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms use Case', () => {
  beforeEach(() => {
    gynsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gynsRepository)
  })

  it('should be search gyms', async () => {
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
      longitude: -47.068035,
    })

    const { gyms } = await sut.execute({ query: 'JS Academy', page: 1 })

    expect(gyms).toHaveLength(1)
  })

  it('should be search gyms with pagination', async () => {
    for (let index = 1; index <= 22; index++) {
      await gynsRepository.create({
        title: `JS Academy ${index}`,
        description: '',
        phone: '',
        latitude: -22.902574,
        longitude: -47.068035,
      })
    }

    const { gyms } = await sut.execute({ query: 'JS Academy', page: 2 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JS Academy 21' }),
      expect.objectContaining({ title: 'JS Academy 22' }),
    ])
  })
})
