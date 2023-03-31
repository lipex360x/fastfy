import { CheckIn } from 'prisma/prisma-client'

import { PipelineBuilder } from '@/core/pipeline'

import { CreateCheckInProps } from '../../domain/schemas'
import {
  CreateCheckInHandler,
  RetrieveCheckInHandler,
  RetrieveGymHandler,
  RetrieveUserHandler,
  ValidateGymDistanceHandler,
} from '../handlers'

export class CreateCheckInUseCase {
  private readonly pipeline = new PipelineBuilder<CreateCheckInProps>()

  constructor(
    private readonly retrieveUserHandler: RetrieveUserHandler,
    private readonly retrieveGymHandler: RetrieveGymHandler,
    private readonly validateGymDistanceHandler: ValidateGymDistanceHandler,
    private readonly retrieveCheckInHandler: RetrieveCheckInHandler,
    private readonly createCheckInHandler: CreateCheckInHandler,
  ) {}

  async execute(request: CreateCheckInProps) {
    const checkIn: CheckIn = await this.pipeline
      .input(request)
      .step(this.retrieveUserHandler)
      .step(this.retrieveGymHandler)
      .step(this.validateGymDistanceHandler)
      .step(this.retrieveCheckInHandler)
      .step(this.createCheckInHandler)
      .run()

    return { checkIn }
  }
}
