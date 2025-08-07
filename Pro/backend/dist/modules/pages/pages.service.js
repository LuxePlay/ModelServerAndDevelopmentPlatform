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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const page_entity_1 = require("./entities/page.entity");
const role_entity_1 = require("../roles/entities/role.entity");
let PagesService = class PagesService {
    constructor(pagesRepository, rolesRepository) {
        this.pagesRepository = pagesRepository;
        this.rolesRepository = rolesRepository;
    }
    async findAll() {
        return this.pagesRepository.find({ relations: ['roles'] });
    }
    async findOne(id) {
        return this.pagesRepository.findOne({ where: { id }, relations: ['roles'] });
    }
    async create(pageData) {
        const page = this.pagesRepository.create(pageData);
        return this.pagesRepository.save(page);
    }
    async update(id, pageData) {
        await this.pagesRepository.update(id, pageData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.pagesRepository.delete(id);
    }
    async setVisible(id, visible) {
        await this.pagesRepository.update(id, { visible });
        return this.findOne(id);
    }
    async setRoles(pageId, roleIds) {
        const page = await this.findOne(pageId);
        const roles = await this.rolesRepository.findByIds(roleIds);
        page.roles = roles;
        return this.pagesRepository.save(page);
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(page_entity_1.Page)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PagesService);
//# sourceMappingURL=pages.service.js.map