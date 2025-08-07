"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSeed = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../modules/roles/entities/role.entity");
const permission_entity_1 = require("../modules/permissions/entities/permission.entity");
const user_entity_1 = require("../modules/users/entities/user.entity");
const page_entity_1 = require("../modules/pages/entities/page.entity");
let InitialSeed = class InitialSeed {
    constructor(rolesRepository, permissionsRepository, usersRepository, pagesRepository) {
        this.rolesRepository = rolesRepository;
        this.permissionsRepository = permissionsRepository;
        this.usersRepository = usersRepository;
        this.pagesRepository = pagesRepository;
    }
    async run() {
        const permissionsData = [
            { name: 'manage_roles', description: '管理角色', module: '权限管理', action: 'manage', resource: 'roles' },
            { name: 'manage_users', description: '管理用户', module: '用户管理', action: 'manage', resource: 'users' },
            { name: 'manage_permissions', description: '管理权限', module: '权限管理', action: 'manage', resource: 'permissions' },
            { name: 'manage_pages', description: '管理页面', module: '页面管理', action: 'manage', resource: 'pages' },
            { name: 'view_users', description: '查看用户', module: '用户管理', action: 'read', resource: 'users' },
            { name: 'edit_users', description: '编辑用户', module: '用户管理', action: 'update', resource: 'users' },
            { name: 'view_profile', description: '查看个人资料', module: '用户管理', action: 'read', resource: 'profile' },
            { name: 'edit_profile', description: '编辑个人资料', module: '用户管理', action: 'update', resource: 'profile' },
        ];
        const permissions = [];
        for (const permData of permissionsData) {
            const permission = await this.permissionsRepository.findOne({ where: { name: permData.name } });
            if (!permission) {
                const newPermission = this.permissionsRepository.create(permData);
                permissions.push(await this.permissionsRepository.save(newPermission));
            }
            else {
                permissions.push(permission);
            }
        }
        const rolesData = [
            {
                name: 'super_admin',
                description: '超级管理员',
                permissions: permissions.slice(0, 4)
            },
            {
                name: 'admin',
                description: '管理员',
                permissions: permissions.slice(4, 6)
            },
            {
                name: 'user',
                description: '普通用户',
                permissions: permissions.slice(6)
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
            }
            else {
                role.permissions = roleData.permissions;
                roles.push(await this.rolesRepository.save(role));
            }
        }
        const adminUser = await this.usersRepository.findOne({ where: { username: 'admin' } });
        if (!adminUser) {
            const newAdmin = this.usersRepository.create({
                username: 'admin',
                password: 'admin123',
                email: 'admin@example.com',
                real_name: '超级管理员',
                roles: [roles[0]]
            });
            await this.usersRepository.save(newAdmin);
        }
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
};
exports.InitialSeed = InitialSeed;
exports.InitialSeed = InitialSeed = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(page_entity_1.Page)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InitialSeed);
//# sourceMappingURL=seedsInitial.js.map