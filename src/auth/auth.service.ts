import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersRepository } from '../routes/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersRepository))
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersRepository.getUser(username);
    if (user === null) {
      throw new NotFoundException();
    }

    const matchPasswords = await compare(password, user.password);
    if (!matchPasswords) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
