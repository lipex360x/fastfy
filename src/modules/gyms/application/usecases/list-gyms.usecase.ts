import { ListGymsProps } from '../../domain/schemas'
import { IGymsRepository } from '../../infra/repositories/interfaces'

export class ListGymsUseCase {
  constructor(private readonly gymsRepository: IGymsRepository) {}

  async execute({ q: query, page = 1 }: ListGymsProps) {
    const gyms = await this.gymsRepository.findManyByQuery(query, page)

    return { gyms }
  }
}
