import { Gym, Prisma } from 'prisma/prisma-client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface IGymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym | null>
  findById(id: string): Promise<Gym | null>
  findManyByQuery(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}
