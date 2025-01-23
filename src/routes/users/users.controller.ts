import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() { username, password }: { username: string; password: string },
  ): Promise<{ access_token: string }> {
    return await this.usersService.register(username, password);
  }

  @Post('login')
  async login(
    @Body() { username, password }: { username: string; password: string },
  ): Promise<{ access_token: string } | string> {
    return await this.usersService.login(username, password);
  }
}
