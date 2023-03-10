import { UserProps } from '@/schemas'

export const makeUser = (props?: Partial<UserProps>) => ({
  name: 'john doe',
  email: 'john@mail.com',
  password: 'mypwd',
  ...props,
})
