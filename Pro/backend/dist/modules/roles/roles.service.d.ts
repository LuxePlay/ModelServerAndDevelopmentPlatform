import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    findByName(name: string): Promise<Role | undefined>;
    create(roleData: Partial<Role>): Promise<Role>;
    update(id: number, roleData: Partial<Role>): Promise<Role>;
    remove(id: number): Promise<void>;
}
