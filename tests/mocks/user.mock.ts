import { UserProps } from '@/modules/users/domain/schemas'

export const makeUser = (props?: Partial<UserProps>) => ({
  name: 'john doe',
  email: 'john@mail.com',
  password: 'mypwd',
  ...props,
})
