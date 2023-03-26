import { ResourceNotFoundError } from '@/core/errors'
import { IUsersRepository } from '@/modules/users/infra/repositories'

interface RequestProps {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export class RetrieveUserHandler {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async handler(request: RequestProps) {
    const user = await this.usersRepository.findById(request.userId)

    if (!user) throw new ResourceNotFoundError()

    return request
  }
}
