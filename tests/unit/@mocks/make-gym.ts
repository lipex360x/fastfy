import { Decimal } from '@prisma/client/runtime/library'

export const makeGym = () => ({
  id: 'gym-01',
  title: 'The Gym',
  description: 'gym',
  latitude: new Decimal(37.2750131) as unknown as number,
  longitude: new Decimal(-121.9756296) as unknown as number,
  phone: '999',
})
