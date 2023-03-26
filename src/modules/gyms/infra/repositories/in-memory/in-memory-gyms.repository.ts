import { randomUUID } from 'crypto'
import { Gym, Prisma } from 'prisma/prisma-client'

import { getDistanceBetweenCoordinates } from '@/core/helpers'
import { MAX_DISTANCE_NEARBY } from '@/modules/users/domain/constants'
import { Decimal } from '@prisma/client/runtime/library'

import {
  FindManyNearbyParams,
  IGymsRepository,
} from '../interfaces/gyms-repository.interface'

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      phone: data.phone ?? null,
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    return gym ?? null
  }

  async findManyByQuery(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < MAX_DISTANCE_NEARBY
    })
  }
}
