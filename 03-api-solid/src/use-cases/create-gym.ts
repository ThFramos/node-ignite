import { Gym } from 'prisma/prisma-client'
import { GymsInterfaceRepository } from '../repositories/gyms-interface-repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | string
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsInterfaceRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
