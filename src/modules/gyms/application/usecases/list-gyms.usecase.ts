import { IGymsRepository } from '../../infra/repositories/interfaces'

interface RequestProps {
  query: string
  page?: number
}

export class ListGymsUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({ query, page = 1 }: RequestProps) {
    const gyms = await this.gymsRepository.findManyByQuery(query, page)

    return { gyms }
  }
}
