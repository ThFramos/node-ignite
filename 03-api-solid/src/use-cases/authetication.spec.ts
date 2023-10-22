import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticationUseCase } from './authentication'
import { InvalidCredentialError } from './errors/invalid-credential-error'

let useRepository: InMemoryUsersRepository
let sut: AuthenticationUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new AuthenticationUseCase(useRepository)
  })

  it('should be able to authenticate', async () => {
    await useRepository.create({
      nome: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await useRepository.create({
      nome: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
