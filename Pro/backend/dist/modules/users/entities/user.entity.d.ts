import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    student_id: string;
    phone: string;
    department: string;
    real_name: string;
    email: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    roles: Role[];
}
