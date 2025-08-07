import { Role } from '../../roles/entities/role.entity';
export declare class Page {
    id: number;
    name: string;
    label: string;
    visible: boolean;
    description: string;
    order: number;
    parentId: number;
    roles: Role[];
}
