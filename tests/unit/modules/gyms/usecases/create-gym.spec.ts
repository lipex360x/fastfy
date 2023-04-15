import { beforeEach, describe, expect, it } from 'vitest'

import { CreateGymUseCase } from '@/modules/gyms/application/usecases'
import { InMemoryGymsRepository } from '@/modules/gyms/infra/repositories/in-memory'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('CreateGymUseCase', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })
  it('Should register a gym', async () => {
    // arrange
    const newGym = {
      title: 'The Gym',
      description: 'gym',
      latitude: 37.2750131,
      longitude: -121.9756296,
      phone: '999',
    }

    // act
    const { gym } = await sut.execute(newGym)

    // assert
    expect(gym!.id).toEqual(expect.any(String))
  })

  it.todo(
    'should not be able to register a gym with the same latitude/longitude',
  )
})
