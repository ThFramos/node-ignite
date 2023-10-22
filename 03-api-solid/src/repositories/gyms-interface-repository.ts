import { Gym } from 'prisma/prisma-client'

export interface GymsInterfaceRepository {
  findById(id: string): Promise<Gym | null>
}
