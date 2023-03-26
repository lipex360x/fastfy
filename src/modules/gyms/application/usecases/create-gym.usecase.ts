import { IGymsRepository } from '../../infra/repositories/interfaces'

type RequestProps = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: RequestProps) {
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
