import { Gym, Prisma } from 'prisma/prisma-client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsInterfaceRepository {
  findById(id: string): Promise<Gym | null>
  fndManyNearBy(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
