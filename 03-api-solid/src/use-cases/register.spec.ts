import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/email-already-exists-error'
import { RegisterUseCase } from './register'

let useRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

beforeEach(() => {
  useRepository = new InMemoryUsersRepository()
  registerUseCase = new RegisterUseCase(useRepository)
})
describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const { id } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(id).toEqual(expect.any(String))
  })

  it('should hash  user  password  upon registration', async () => {
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
