import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/email-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const useRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(useRepository)

    const { id } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(id).toEqual(expect.any(String))
  })

  it('should hash  user  password  upon registration', async () => {
    const useRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(useRepository)

    const password = '123456'

    const { password_hash } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(password, password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register user with same email twice', async () => {
    const useRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(useRepository)

    const user = {
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    }

    await registerUseCase.execute(user)

    await expect(() => registerUseCase.execute(user)).rejects.toBeInstanceOf(
      UserAlreadyExists,
    )
  })
})
