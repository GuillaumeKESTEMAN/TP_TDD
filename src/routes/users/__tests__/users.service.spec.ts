import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';

describe('UsersService', () => {
    let registerService: UsersService;
    let userRepository: UsersRepository;

    beforeEach(async () => {
        userRepository = {
            addUser: jest.fn()
        } as unknown as UsersRepository;

        registerService = new UsersService(userRepository);
    });

    it('should register user with the register repository', () => {
        registerService.register('testUser', 'testPassword');
        expect(userRepository.addUser).toHaveBeenCalledWith('testUser', 'testPassword');
    });
});
