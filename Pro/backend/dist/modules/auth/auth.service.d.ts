import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export interface User {
    id: number;
    username: string;
    email: string;
    roles: Array<{
        name: string;
    }>;
}
export default class AuthService {
    private readonly jwtService;
    private readonly usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    validateUser(username: string, password: string): Promise<User | null>;
    signToken(payload: any): string;
}
