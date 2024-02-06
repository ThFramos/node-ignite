import { CheckInInterfaceRepository } from '../repositories/check-in-interface-repository'

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsReponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepositories: CheckInInterfaceRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsReponse> {
    const checkInsCount =
      await this.checkInsRepositories.getUserCountFromMetrics(userId)

    return {
      checkInsCount,
    }
  }
}
