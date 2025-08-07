import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Array<{ name: string }>;
}

@Injectable()
export default class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    // 从数据库中查找用户
    const user = await this.usersService.findOneByUsername(username);
    
    // 如果用户不存在，返回 null
    if (!user) {
      return null;
    }
    
    // 注意：在实际应用中，应该使用 bcrypt 等库来比较加密后的密码
    // 这里为了简化，直接比较明文密码
    if (user.password !== password) {
      return null;
    }
    
    // 返回用户信息，包括角色
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => ({ name: role.name }))
    };
  }

  signToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
}