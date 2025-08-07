import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
export declare class PermissionsController {
    private readonly permissionsService;
    constructor(permissionsService: PermissionsService);
    findAll(): Promise<Permission[]>;
    findOne(id: string): Promise<Permission>;
    create(permissionData: Partial<Permission>): Promise<Permission>;
    update(id: string, permissionData: Partial<Permission>): Promise<Permission>;
    remove(id: string): Promise<void>;
    checkPermission(req: any, checkDto: {
        permissionName: string;
    }): Promise<{
        hasPermission: boolean;
    }>;
}
