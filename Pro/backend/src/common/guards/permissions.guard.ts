// backend/src/common/guards/permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      return false;
    }
    
    const fullUser = await this.usersService.findById(user.id);
    if (!fullUser || !fullUser.roles) {
      return false;
    }
    
    // 检查用户是否拥有任何所需权限
    for (const permission of requiredPermissions) {
      const hasPermission = await this.checkPermission(fullUser, permission);
      if (hasPermission) {
        return true;
      }
    }
    
    return false;
  }
  
  private async checkPermission(user: any, permissionName: string): Promise<boolean> {
    for (const role of user.roles) {
      // 这里应该从数据库获取角色的完整信息，包括权限
      // 简化实现，实际应查询数据库
      if (role.permissions && role.permissions.some(p => p.name === permissionName)) {
        return true;
      }
    }
    return false;
  }
}