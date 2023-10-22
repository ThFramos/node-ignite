import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialError } from './errors/invalid-credential-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetUserProfileUse } from './get-user-profile'

let useRepository: InMemoryUsersRepository
let sut: GetUserProfileUse

describe('GetUserProfile Use Case', () => {
  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUse(useRepository)
  })
  it('should be able to profile', async () => {
    const createdUser = await useRepository.create({
      nome: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.nome).toEqual('Jhon Doe')
  })

  it('should be not able with wrong profile', async () => {
    await expect(() =>
      sut.execute({
        userId: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
