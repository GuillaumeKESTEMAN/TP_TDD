import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import type { AuthService } from 'src/auth/auth.service';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  const password = 'testPassword';
  let usersService: UsersService;
  let userRepository;

  beforeEach(async () => {
    const authService = {
      signIn: jest.fn().mockReturnValue({ access_token: 'VALID_JWT_TOKEN' }),
    };
    userRepository = {
      addUser: jest.fn(),
    };

    usersService = new UsersService(
      userRepository,
      authService as unknown as AuthService,
    );
  });

  it('should register user with the repository', async () => {
    expect(await usersService.register('testUser', password)).toEqual({
      access_token: 'VALID_JWT_TOKEN',
    });

    expect(userRepository.addUser).toHaveBeenCalledWith(
      'testUser',
      expect.any(String),
    );

    const match = await compare(
      password,
      userRepository.addUser.mock.calls[0][1],
    );
    expect(match).toBeTruthy();
  });

  it('should login user with the repository', async () => {
    expect(await usersService.login('testUser', password)).toEqual({
      access_token: 'VALID_JWT_TOKEN',
    });
  });

  it('should not login user with the repository', async () => {
    jest.resetAllMocks();

    const authService = {
      signIn: jest.fn().mockImplementation(() => {
        throw new UnauthorizedException();
      }),
    };
    userRepository = {
      addUser: jest.fn(),
    };

    usersService = new UsersService(
      userRepository,
      authService as unknown as AuthService,
    );

    await expect(
      usersService.login('testUser', 'wrongPassword'),
    ).rejects.toThrow(new UnauthorizedException('Access denied'));
  });
});
