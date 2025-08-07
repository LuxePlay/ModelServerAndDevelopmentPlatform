import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
export type JwtPayload = {
    sub: number;
    username: string;
    roles: string[];
};
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: UsersService);
    validate(payload: JwtPayload): Promise<{
        id: number;
        username: string;
        email: string;
        roles: import("../roles/entities/role.entity").Role[];
    }>;
}
export {};
