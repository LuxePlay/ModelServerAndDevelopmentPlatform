import AuthService from './auth.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly rolesService;
    constructor(authService: AuthService, usersService: UsersService, rolesService: RolesService);
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
        access_token?: undefined;
    } | {
        success: boolean;
        user: {
            id: number;
            username: string;
            email: string;
            roles: {
                name: string;
            }[];
        };
        access_token: string;
        message?: undefined;
    }>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
    getProfile(req: any): any;
}
