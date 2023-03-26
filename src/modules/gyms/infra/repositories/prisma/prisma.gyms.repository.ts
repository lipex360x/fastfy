import { Gym, Prisma } from 'prisma/prisma-client'

import { prisma } from '@/core/lib'

import { FindManyNearbyParams, IGymsRepository } from '../interfaces'

export class PrismaGymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput) {
    return prisma.gym.create({ data })
  }

  async findById(id: string) {
    return prisma.gym.findUnique({
      where: { id },
    })
  }

  async findManyByQuery(query: string, page: number) {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    return prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `
  }
}
