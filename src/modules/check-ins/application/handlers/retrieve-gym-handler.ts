import { ResourceNotFoundError } from '@/core/errors'
import { IGymsRepository } from '@/modules/gyms/infra/repositories/interfaces'

interface RequestProps {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export class RetrieveGymHandler {
  constructor(private gymRepository: IGymsRepository) {}

  async handler(request: RequestProps) {
    const retrieveGym = await this.gymRepository.findById(request.gymId)

    if (!retrieveGym) throw new ResourceNotFoundError()

    return { request, retrieveGym }
  }
}
