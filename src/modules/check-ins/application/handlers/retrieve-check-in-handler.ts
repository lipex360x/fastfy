import { MaxNumberOfCheckInError } from '@/modules/check-ins/domain/errors'
import { ICheckInRepository } from '@/modules/check-ins/infra/repositories/interfaces'

import { CheckInProps } from '../../domain/schemas'

interface RequestProps {
  request: CheckInProps
}

export class RetrieveCheckInHandler {
  constructor(private checkInRepository: ICheckInRepository) {}

  async handler({ request }: RequestProps) {
    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      request.userId,
      new Date(),
    )

    if (checkInOnSameDay) throw new MaxNumberOfCheckInError()

    return { request }
  }
}
