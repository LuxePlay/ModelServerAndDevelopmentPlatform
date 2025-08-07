import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../modules/roles/entities/role.entity';
import { Permission } from '../modules/permissions/entities/permission.entity';
import { User } from '../modules/users/entities/user.entity';
import { Page } from '../modules/pages/entities/page.entity';

@Injectable()
export class InitialSeed {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Page)
    private pagesRepository: Repository<Page>,
  ) {}

  async run() {
    // 创建权限
    const permissionsData = [
      // 超级管理员权限
      { name: 'manage_roles', description: '管理角色', module: '权限管理', action: 'manage', resource: 'roles' },
      { name: 'manage_users', description: '管理用户', module: '用户管理', action: 'manage', resource: 'users' },
      { name: 'manage_permissions', description: '管理权限', module: '权限管理', action: 'manage', resource: 'permissions' },
      { name: 'manage_pages', description: '管理页面', module: '页面管理', action: 'manage', resource: 'pages' },
      
      // 管理员权限
      { name: 'view_users', description: '查看用户', module: '用户管理', action: 'read', resource: 'users' },
      { name: 'edit_users', description: '编辑用户', module: '用户管理', action: 'update', resource: 'users' },
      
      // 普通用户权限
      { name: 'view_profile', description: '查看个人资料', module: '用户管理', action: 'read', resource: 'profile' },
      { name: 'edit_profile', description: '编辑个人资料', module: '用户管理', action: 'update', resource: 'profile' },
    ];

    const permissions = [];
    for (const permData of permissionsData) {
      const permission = await this.permissionsRepository.findOne({ where: { name: permData.name } });
      if (!permission) {
        const newPermission = this.permissionsRepository.create(permData);
        permissions.push(await this.permissionsRepository.save(newPermission));
      } else {
        permissions.push(permission);
      }
    }

    // 创建角色
    const rolesData = [
      { 
        name: 'super_admin', 
        description: '超级管理员', 
        permissions: permissions.slice(0, 4) // 前4个权限
      },
      { 
        name: 'admin', 
        description: '管理员', 
        permissions: permissions.slice(4, 6) // 第5-6个权限
      },
      { 
        name: 'user', 
        description: '普通用户', 
        permissions: permissions.slice(6) // 最后2个权限
      },
    ];

    const roles = [];
    for (const roleData of rolesData) {
      const role = await this.rolesRepository.findOne({ where: { name: roleData.name }, relations: ['permissions'] });
      if (!role) {
        const newRole = this.rolesRepository.create({
          name: roleData.name,
          description: roleData.description
        });
        newRole.permissions = roleData.permissions;
        roles.push(await this.rolesRepository.save(newRole));
      } else {
        // 更新现有角色的权限
        role.permissions = roleData.permissions;
        roles.push(await this.rolesRepository.save(role));
      }
    }

    // 创建默认超级管理员用户
    const adminUser = await this.usersRepository.findOne({ where: { username: 'admin' } });
    if (!adminUser) {
      const newAdmin = this.usersRepository.create({
        username: 'admin',
        password: 'admin123', // 实际项目中应该加密
        email: 'admin@example.com',
        real_name: '超级管理员',
        roles: [roles[0]] // 分配超级管理员角色
      });
      await this.usersRepository.save(newAdmin);
    }

    // 创建页面数据
    const pagesData = [
      { name: 'training', label: '大模型服务与应用平台', visible: true, order: 1 },
      { name: 'development_doc', label: '开发中心文档', visible: true, order: 2 },
      { name: 'dataset', label: '数据管理平台', visible: true, order: 3 },
      { name: 'training/model-management', label: '大模型管理', visible: true, order: 1, parentId: 1 },
      { name: 'training/model-deployment', label: '大模型实例化部署', visible: true, order: 2, parentId: 1 },
      { name: 'training/knowledge-library', label: '知识库', visible: true, order: 3, parentId: 1 },
      { name: 'training/user-experience', label: '用户体验中心', visible: true, order: 4, parentId: 1 },
      { name: 'training/prompt-engineering', label: 'Prompt工程', visible: true, order: 5, parentId: 1 },
      { name: 'training/plugin-center', label: '插件中心', visible: true, order: 6, parentId: 1 },
      { name: 'training/agent-center', label: '智能体中心', visible: true, order: 7, parentId: 1 },
      { name: 'training/workflow-orchestration', label: 'AI工作流编排', visible: true, order: 8, parentId: 1 },
      { name: 'training/fine-tuning', label: '微调中心', visible: true, order: 9, parentId: 1 },
      { name: 'training/modelpretraining', label: '数据预训练', visible: true, order: 10, parentId: 1 },
      { name: 'dataset/dataManager', label: '数据集管理', visible: true, order: 1, parentId: 3 },
      { name: 'dataset/labeling', label: '数据标注', visible: true, order: 2, parentId: 3 },
      { name: 'dataset/upload', label: '数据上传', visible: true, order: 3, parentId: 3 },
      { name: 'dataset/preprocessing', label: '数据预处理', visible: true, order: 4, parentId: 3 },
      { name: 'dataset/replay', label: '数据回流', visible: true, order: 5, parentId: 3 },
      { name: 'dataset/cleaning', label: '数据清洗', visible: true, order: 6, parentId: 3 },
      { name: 'dataset/quality', label: '数据质量', visible: true, order: 7, parentId: 3 },
      { name: 'dataset/sharing', label: '数据共享', visible: true, order: 8, parentId: 3 },
    ];

    for (const pageData of pagesData) {
      const page = await this.pagesRepository.findOne({ where: { name: pageData.name } });
      if (!page) {
        const newPage = this.pagesRepository.create(pageData);
        await this.pagesRepository.save(newPage);
      }
    }

    console.log('数据库初始化完成');
  }
}