import { ICheckInRepository } from '@/modules/check-ins/infra/repositories/interfaces'

interface RequestProps {
  userId: string
}

export class CountUserCheckInsUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({ userId }: RequestProps) {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
