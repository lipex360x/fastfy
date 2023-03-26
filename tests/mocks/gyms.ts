import { randomUUID } from 'crypto'
import { Gym } from 'prisma/prisma-client'

import { Decimal } from '@prisma/client/runtime/library'

interface CreateGymProps {
  title: string
  description: string
  latitude: number
  longitude: number
  phone: string
}

export const makeGym = (props?: Partial<CreateGymProps>) => ({
  title: 'The Gym',
  description: 'gym',
  latitude: new Decimal(37.2750131).toNumber(),
  longitude: new Decimal(-121.9756296).toNumber(),
  phone: '999.999.999',

  ...props,
})

export const makeGymDB = (props?: Partial<Gym>) => ({
  id: randomUUID(),
  created_at: new Date(),

  ...makeGym(),
  ...props,
})
