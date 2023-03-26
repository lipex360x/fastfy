import { IGymsRepository } from '../../infra/repositories/interfaces'

interface RequestProps {
  userLatitude: number
  userLongitude: number
}

export class ListGymsNearbyUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({ userLatitude, userLongitude }: RequestProps) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
