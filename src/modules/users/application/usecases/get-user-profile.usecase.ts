import { ResourceNotFoundError } from '@/core/errors'

import { IUsersRepository } from '../../infra/repositories'

interface RequestProps {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ userId }: RequestProps) {
    const user = await this.usersRepository.findById(userId)

    if (!user) throw new ResourceNotFoundError()

    return { user }
  }
}
