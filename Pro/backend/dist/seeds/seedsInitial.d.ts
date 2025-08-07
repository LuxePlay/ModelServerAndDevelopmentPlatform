import { Repository } from 'typeorm';
import { Role } from '../modules/roles/entities/role.entity';
import { Permission } from '../modules/permissions/entities/permission.entity';
import { User } from '../modules/users/entities/user.entity';
import { Page } from '../modules/pages/entities/page.entity';
export declare class InitialSeed {
    private rolesRepository;
    private permissionsRepository;
    private usersRepository;
    private pagesRepository;
    constructor(rolesRepository: Repository<Role>, permissionsRepository: Repository<Permission>, usersRepository: Repository<User>, pagesRepository: Repository<Page>);
    run(): Promise<void>;
}
