import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    userRepository = {
      getUser: jest
        .fn()
        .mockReturnValue(
          new User(
            'john',
            '$2b$10$/OsH1x5rEx7pPDPA9sIUi.p/3kOr2xW1YmjotF5jfDxwNz8FT..N2',
            '1234',
          ),
        ),
    };

    authService = new AuthService(userRepository);
    jwtService = new JwtService();
  });

  it('should return a JWT token', async () => {
    const username = 'john';
    const jwtToken = authService.signIn(username, 'my_super_secure_passw0rd');

    expect(userRepository.getUser).toHaveBeenCalledWith(username);

    const payload = await jwtService.verifyAsync(jwtToken);

    expect(payload['sub']).toEqual('1234');
    expect(payload['username']).toEqual(username);
  });

  it('should return throw an UnauthorizedException', async () => {
    const username = 'john';
    expect(authService.signIn(username, 'my_super_insecure_passw0rd')).toThrow(
      UnauthorizedException,
    );
  });
});
