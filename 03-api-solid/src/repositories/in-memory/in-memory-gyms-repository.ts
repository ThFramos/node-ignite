import { Gym } from 'prisma/prisma-client'
import { GymsInterfaceRepository } from '../gyms-interface-repository'

export class InMemoryGymsRepository implements GymsInterfaceRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
