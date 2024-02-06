import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { Gym, Prisma } from 'prisma/prisma-client'
import { getDistanceBetweenCoordinates } from '../../utils/get-distance-between-coordinates'
import {
  FindManyNearbyParams,
  GymsInterfaceRepository,
} from '../gyms-interface-repository'

export class InMemoryGymsRepository implements GymsInterfaceRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async fndManyNearBy(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { longitude: params.longitude, latitude: params.latitude },
        {
          longitude: item.longitude.toNumber(),
          latitude: item.latitude.toNumber(),
        },
      )
      console.log({ distance })
      return distance <= 10
    })
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title ?? null,
      description: data.description ?? null,
      phone: data.phone,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)
    return gym
  }
}
