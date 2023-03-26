import { Gym } from 'prisma/prisma-client'

import { getDistanceBetweenCoordinates } from '@/core/helpers'
import { MAX_DISTANCE_IN_KILOMETERS } from '@/modules/users/domain/constants'
import { MaxDistanceError } from '@/modules/users/domain/errors'

import { CheckInProps } from '../../domain/schemas'

interface RequestProps {
  retrieveGym: Gym
  request: CheckInProps
}

export class ValidateGymDistanceHandler {
  async handler({ request, retrieveGym }: RequestProps) {
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: request.userLatitude,
        longitude: request.userLongitude,
      },
      {
        latitude: retrieveGym.latitude.toNumber(),
        longitude: retrieveGym.longitude.toNumber(),
      },
    )

    if (distance > MAX_DISTANCE_IN_KILOMETERS) throw new MaxDistanceError()

    return { request }
  }
}
