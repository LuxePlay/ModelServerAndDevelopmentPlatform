import { Role } from '../../roles/entities/role.entity';
export declare class Permission {
    id: number;
    name: string;
    description: string;
    module: string;
    action: string;
    resource: string;
    created_at: Date;
    roles: Role[];
}
