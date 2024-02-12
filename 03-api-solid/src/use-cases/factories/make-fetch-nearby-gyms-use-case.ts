import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { FetchNearByGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
    const prismaGymRepository = new PrismaGymsRepository()
    const useCase = new FetchNearByGymsUseCase(prismaGymRepository)

    return useCase
}
