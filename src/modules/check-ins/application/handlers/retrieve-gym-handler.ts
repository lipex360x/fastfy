import { ResourceNotFoundError } from '@/core/errors'
import { IGymsRepository } from '@/modules/gyms/infra/repositories/interfaces'

import { CreateCheckInProps } from '../../domain/schemas'

export class RetrieveGymHandler {
  constructor(private gymRepository: IGymsRepository) {}

  async handler(request: CreateCheckInProps) {
    const retrieveGym = await this.gymRepository.findById(request.gymId)

    if (!retrieveGym) throw new ResourceNotFoundError()

    return { request, retrieveGym }
  }
}
