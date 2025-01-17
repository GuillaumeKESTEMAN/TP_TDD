import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('register')
    register(@Body() { username, password }: { username: string; password: string }): void {
        this.usersService.register(username, password);
    }
}
