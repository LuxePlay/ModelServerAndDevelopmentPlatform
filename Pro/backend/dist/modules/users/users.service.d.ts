import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
export declare class UsersService {
    private usersRepository;
    private rolesRepository;
    constructor(usersRepository: Repository<User>, rolesRepository: Repository<Role>);
    findAll(role?: string, page?: number, limit?: number): Promise<{
        users: User[];
        total: number;
    }>;
    findById(id: number): Promise<User>;
    findOneById(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    create(userData: Partial<User>): Promise<User>;
    update(id: number, userData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
    search(keyword: string): Promise<User[]>;
}
