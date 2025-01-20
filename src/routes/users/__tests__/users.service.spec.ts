import { compare } from 'bcrypt';
import type { AuthService } from '../../../auth/auth.service';
import { UsersService } from '../users.service';

describe('UsersService', () => {
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

  it('should register user with the register repository', async () => {
    const password = 'testPassword';
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
});
