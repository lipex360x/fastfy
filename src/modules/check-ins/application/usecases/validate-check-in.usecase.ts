import dayjs from 'dayjs'

import { ResourceNotFoundError } from '@/core/errors'

import { MAX_MINUTES_FROM_CHECK_IN } from '../../domain/constants'
import { LateCheckInValidateError } from '../../domain/errors'
import { ICheckInRepository } from '../../infra/repositories'

interface RequestProps {
  checkInId: string
}

export class ValidateCheckInUseCase {
  constructor(private readonly checkInRepository: ICheckInRepository) {}

  async execute({ checkInId }: RequestProps) {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCheckInCreaton = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreaton > MAX_MINUTES_FROM_CHECK_IN) {
      throw new LateCheckInValidateError()
    }

    await this.checkInRepository.save(checkIn)

    checkIn.validated_at = new Date()

    return { checkIn }
  }
}
