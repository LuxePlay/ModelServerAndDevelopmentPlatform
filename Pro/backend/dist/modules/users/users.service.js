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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("../roles/entities/role.entity");
let UsersService = class UsersService {
    constructor(usersRepository, rolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }
    async findAll(role, page = 1, limit = 10) {
        const queryBuilder = this.usersRepository.createQueryBuilder('user');
        if (role) {
            queryBuilder.innerJoinAndSelect('user.roles', 'role')
                .where('role.name = :role', { role });
        }
        else {
            queryBuilder.leftJoinAndSelect('user.roles', 'role');
        }
        const [users, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return { users, total };
    }
    async findById(id) {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['roles']
        });
    }
    async findOneById(id) {
        return this.usersRepository.findOne({
            where: { id },
            relations: ['roles']
        });
    }
    async findOneByUsername(username) {
        return this.usersRepository.findOne({
            where: { username },
            relations: ['roles']
        });
    }
    async create(userData) {
        if (userData.roles && userData.roles.length > 0) {
            const roles = await this.rolesRepository.findByIds(userData.roles.map(role => role.id));
            userData.roles = roles;
        }
        const user = this.usersRepository.create(userData);
        return this.usersRepository.save(user);
    }
    async update(id, userData) {
        if (userData.roles && userData.roles.length > 0) {
            const roles = await this.rolesRepository.findByIds(userData.roles.map(role => role.id));
            userData.roles = roles;
        }
        await this.usersRepository.update(id, userData);
        return this.findOneById(id);
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
    async search(keyword) {
        return this.usersRepository.find({
            where: [
                { username: (0, typeorm_2.Like)(`%${keyword}%`) },
                { real_name: (0, typeorm_2.Like)(`%${keyword}%`) },
                { email: (0, typeorm_2.Like)(`%${keyword}%`) }
            ],
            relations: ['roles']
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map