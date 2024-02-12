import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
    const prsimaGymRepository = new PrismaGymsRepository
    const useCase = new CreateGymUseCase(prsimaGymRepository)

    return useCase
}
