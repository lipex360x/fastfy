import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { User } from 'prisma/prisma-client'

interface CreateUserProps {
  name: string
  email: string
  password: string
}

export const makeUser = (props?: Partial<CreateUserProps>) => ({
  name: 'john doe',
  email: 'john@mail.com',
  password: 'pwd',

  ...props,
})

export const makeUserDB = async (props?: Partial<User>) => ({
  id: randomUUID(),
  created_at: new Date(),
  password_hash: await hash(makeUser(props).password, 6),

  ...makeUser(),
  ...props,
})
