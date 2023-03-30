import { ListGymsNearbyProps } from '../../domain/schemas'
import { IGymsRepository } from '../../infra/repositories/interfaces'

export class ListGymsNearbyUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({
    latitude: userLatitude,
    longitude: userLongitude,
  }: ListGymsNearbyProps) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
