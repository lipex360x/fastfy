import { ICheckInRepository } from '@/modules/check-ins/infra/repositories/interfaces'

interface RequestProps {
  userId: string
  page?: number
}

export class ListCheckInsUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({ userId, page = 1 }: RequestProps) {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
