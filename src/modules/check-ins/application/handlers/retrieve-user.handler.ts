import { ResourceNotFoundError } from '@/core/errors'
import { IUsersRepository } from '@/modules/users/infra/repositories/interfaces'

import { CreateCheckInProps } from '../../domain/schemas'

export class RetrieveUserHandler {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async handler(request: CreateCheckInProps) {
    const user = await this.usersRepository.findById(request.userId)

    if (!user) throw new ResourceNotFoundError()

    return request
  }
}
