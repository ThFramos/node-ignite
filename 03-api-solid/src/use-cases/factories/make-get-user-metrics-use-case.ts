import { PrismaCheckinRepository } from '../../repositories/prisma/prisma-checkin-repository';
import { GetUserMetricsUseCase } from '../get-user-metrics';

export function makeGetUserMetrics() {
    const prismaCheckinRepository = new PrismaCheckinRepository()
    const useCase = new GetUserMetricsUseCase(prismaCheckinRepository);

    return useCase
}
