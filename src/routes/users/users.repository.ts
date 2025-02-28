import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

export class RegisterException extends Error {}

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async addUser(username: string, password: string): Promise<void> {
    const user = new User(username, password);
    try {
      await this.usersRepository.save(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new RegisterException('Failed to register user');
    }
  }

  async getUser(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username: username } });
  }
}
