import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async register(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const hashedPassword = await hash(password, 10);
    await this.usersRepository.addUser(username, hashedPassword);
    return this.authService.signIn(username, password);
  }
}
