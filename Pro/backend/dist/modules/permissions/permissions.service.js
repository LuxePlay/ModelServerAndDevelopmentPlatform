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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entities/permission.entity");
const users_service_1 = require("../users/users.service");
let PermissionsService = class PermissionsService {
    constructor(permissionsRepository, usersService) {
        this.permissionsRepository = permissionsRepository;
        this.usersService = usersService;
    }
    async findAll() {
        return await this.permissionsRepository.find();
    }
    async findOne(id) {
        return await this.permissionsRepository.findOne({ where: { id } });
    }
    async create(permissionData) {
        const permission = this.permissionsRepository.create(permissionData);
        return await this.permissionsRepository.save(permission);
    }
    async update(id, permissionData) {
        await this.permissionsRepository.update(id, permissionData);
        return await this.permissionsRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.permissionsRepository.delete(id);
    }
    async checkUserPermission(userId, permissionName) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.roles) {
            return false;
        }
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
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map