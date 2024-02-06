import { CheckIn } from 'prisma/prisma-client'
import { CheckInInterfaceRepository } from '../repositories/check-in-interface-repository'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseReponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCaseUseCase {
  constructor(private checkInsRepositories: CheckInInterfaceRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseReponse> {
    const checkIns = await this.checkInsRepositories.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
