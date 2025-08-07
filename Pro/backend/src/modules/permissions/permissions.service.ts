import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Permission[]> {
    return await this.permissionsRepository.find();
  }

  async findOne(id: number): Promise<Permission> {
    return await this.permissionsRepository.findOne({ where: { id } });
  }

  async create(permissionData: Partial<Permission>): Promise<Permission> {
    const permission = this.permissionsRepository.create(permissionData);
    return await this.permissionsRepository.save(permission);
  }

  async update(id: number, permissionData: Partial<Permission>): Promise<Permission> {
    await this.permissionsRepository.update(id, permissionData);
    return await this.permissionsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.permissionsRepository.delete(id);
  }

  async checkUserPermission(userId: number, permissionName: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.roles) {
      return false;
    }

    // 获取包含权限信息的完整角色信息
    for (const role of user.roles) {
      const fullRole = await this.permissionsRepository.manager
        .getRepository('Role')
        .findOne({
          where: { id: role.id },
          relations: ['permissions']
        });

      if (fullRole && fullRole.permissions) {
        for (const permission of fullRole.permissions) {
          if (permission.name === permissionName) {
            return true;
          }
        }
      }
    }

    return false;
  }
}