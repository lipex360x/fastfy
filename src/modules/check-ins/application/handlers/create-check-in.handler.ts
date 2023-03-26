import { CheckInProps } from '@/modules/check-ins/domain/schemas'
import { ICheckInRepository } from '@/modules/check-ins/infra/repositories/interfaces'

interface RequestProps {
  request: CheckInProps
}

export class CreateCheckInHandler {
  constructor(private checkInRepository: ICheckInRepository) {}

  async handler({ request }: RequestProps) {
    return this.checkInRepository.create({
      user_id: request.userId,
      gym_id: request.gymId,
    })
  }
}
