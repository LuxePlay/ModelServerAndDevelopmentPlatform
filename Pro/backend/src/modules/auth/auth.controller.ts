import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthService from './auth.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:  AuthService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      return { 
        success: false, 
        message: '用户名或密码错误' 
      };
    }
    
    const payload = { 
      username: user.username, 
      sub: user.id,
      roles: user.roles.map(role => role.name)
    };
    
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles
      },
      access_token: this.authService.signToken(payload),
    };
  }

  @Post('logout')
  async logout() {
    return { 
      success: true, 
      message: '登出成功' 
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}