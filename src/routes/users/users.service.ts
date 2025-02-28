import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { AuthService } from '../../auth/auth.service';
import { RegisterException, UsersRepository } from './users.repository';

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
    try {
      await this.usersRepository.addUser(username, hashedPassword);
      return this.authService.signIn(username, password);
    } catch (error) {
      if (error instanceof RegisterException) {
        throw new HttpException(
          "Une erreur est survenue lors de l'enregistrement",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw new HttpException(
          "L'utilisateur créé n'a pas été trouvé",
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        'Une erreur inconnue est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string } | string> {
    try {
      return await this.authService.signIn(username, password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (exception) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
  }
}
