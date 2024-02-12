import { PrismaCheckinRepository } from '../../repositories/prisma/prisma-checkin-repository'
import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckinUseCase() {
    const prismaCheckinRepository = new PrismaCheckinRepository()
    const prsimaGymRepository = new PrismaGymsRepository()
    const useCase = new CheckInUseCase(prismaCheckinRepository, prsimaGymRepository)

    return useCase
}
