import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // 检查用户是否存在
    if (!user) {
      return false;
    }
    
    // 检查用户角色是否存在
    if (!user.roles) {
      return false;
    }
    
    // 检查用户是否具有所需角色
    return requiredRoles.some((role) => {
      if (typeof user.roles === 'string') {
        return user.roles === role;
      }
      
      if (Array.isArray(user.roles)) {
        return user.roles.some(userRole => {
          if (typeof userRole === 'string') {
            return userRole === role;
          }
          if (userRole && typeof userRole === 'object' && 'name' in userRole) {
            return userRole.name === role;
          }
          return false;
        });
      }
      
      return false;
    });
  }
}