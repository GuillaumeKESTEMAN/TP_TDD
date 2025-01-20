import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  addUser(username: string, password: string): void {
    const user = new User(username, password);
    this.usersRepository.save(user);
  }

  async getUser(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username: username } });
  }
}
