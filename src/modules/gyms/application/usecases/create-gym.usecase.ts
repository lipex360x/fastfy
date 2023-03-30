import { CreateGymProps } from '../../domain/schemas'
import { IGymsRepository } from '../../infra/repositories/interfaces'

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymProps) {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone,
    })

    return { gym }
  }
}
