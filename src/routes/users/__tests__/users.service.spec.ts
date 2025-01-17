import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { compare, hash } from 'bcrypt';

describe('UsersService', () => {
    let usersService: UsersService;
    let userRepository;

    beforeEach(async () => {
        userRepository = {
            addUser: jest.fn()
        };

        usersService = new UsersService(userRepository);
    });

    it('should register user with the register repository', async () => {
        const password = 'testPassword';
        await usersService.register('testUser', password);

        expect(userRepository.addUser).toHaveBeenCalledWith('testUser', expect.any(String));

        const match = await compare(password, userRepository.addUser.mock.calls[0][1]);
        expect(match).toBeTruthy();
    });
});
