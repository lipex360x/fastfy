import { compare } from 'bcryptjs'
import { makeUser, makeUserDB } from 'tests/unit/mocks'
import { beforeEach, describe, expect, it } from 'vitest'

import { AuthUseCase } from '@/modules/users/application/usecases'
import { InvalidCredentialError } from '@/modules/users/domain/errors'
import { InMemoryUsersRepository } from '@/modules/users/infra/repositories'

let usersRepository: InMemoryUsersRepository
let sut: AuthUseCase

describe('AuthUseCase', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthUseCase(usersRepository)
  })
  it('should authenticate', async () => {
    // arrange
    await usersRepository.create(await makeUserDB())

    // act
    const { user } = await sut.execute(makeUser())

    // assert
    const isPasswordHashed = await compare(
      makeUser().password,
      user.password_hash,
    )

    expect(isPasswordHashed).toBeTruthy()
  })

  it('should not authenticate with wrong/nonexisting e-mail', async () => {
    // act
    const sutFail = sut.execute(makeUser())

    // assert
    await expect(() => sutFail).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not authenticate with wrong password', async () => {
    // arrange
    await usersRepository.create(await makeUserDB())

    // act
    const sutFail = sut.execute(makeUser({ password: 'invalid-password' }))

    // assert
    await expect(() => sutFail).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
