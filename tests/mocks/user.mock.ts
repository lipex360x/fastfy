import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { User } from 'prisma/prisma-client'

import { UserProps } from '@/modules/users/domain/schemas'

export const makeUser = (props?: Partial<UserProps>) => ({
  name: 'john doe',
  email: 'john@mail.com',
  password: 'mypwd',
  ...props,
})

export const makeUserDB = async (props?: Partial<User>): Promise<User> => ({
  id: randomUUID(),
  created_at: new Date(),
  password_hash: await hash(makeUser(props).password, 6),
  ...makeUser(),
  ...props,
})
