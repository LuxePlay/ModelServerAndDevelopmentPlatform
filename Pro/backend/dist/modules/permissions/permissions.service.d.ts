import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { UsersService } from '../users/users.service';
export declare class PermissionsService {
    private permissionsRepository;
    private usersService;
    constructor(permissionsRepository: Repository<Permission>, usersService: UsersService);
    findAll(): Promise<Permission[]>;
    findOne(id: number): Promise<Permission>;
    create(permissionData: Partial<Permission>): Promise<Permission>;
    update(id: number, permissionData: Partial<Permission>): Promise<Permission>;
    remove(id: number): Promise<void>;
    checkUserPermission(userId: number, permissionName: string): Promise<boolean>;
}
