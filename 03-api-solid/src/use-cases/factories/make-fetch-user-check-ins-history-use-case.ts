import { PrismaCheckinRepository } from '../../repositories/prisma/prisma-checkin-repository'
import { FetchUserCheckInsHistoryUseCaseUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckinsHistory() {
    const prismaCheckinRepository = new PrismaCheckinRepository()
    const useCase = new FetchUserCheckInsHistoryUseCaseUseCase(prismaCheckinRepository)

    return useCase
}
