import { hash } from 'bcryptjs'
import { usersInterfaceRepository } from '../repositories/users-interface-repository'
import { UserAlreadyExists } from './errors/email-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: usersInterfaceRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      nome: name,
      email,
      password_hash,
    })
  }
}
