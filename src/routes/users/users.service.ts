import { UsersRepository } from "./users.repository";

export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    register(username: string, password: string) {
        this.usersRepository.addUser(username, password);
    }
}
