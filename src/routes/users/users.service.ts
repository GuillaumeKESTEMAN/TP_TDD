import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(username: string, password: string) {
    const hashedPassword = await hash(password, 10);
    this.usersRepository.addUser(username, hashedPassword);
  }
}
