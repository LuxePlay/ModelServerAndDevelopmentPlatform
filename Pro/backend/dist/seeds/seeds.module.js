"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const seedsInitial_1 = require("./seedsInitial");
const role_entity_1 = require("../modules/roles/entities/role.entity");
const permission_entity_1 = require("../modules/permissions/entities/permission.entity");
const user_entity_1 = require("../modules/users/entities/user.entity");
const page_entity_1 = require("../modules/pages/entities/page.entity");
let SeedsModule = class SeedsModule {
};
exports.SeedsModule = SeedsModule;
exports.SeedsModule = SeedsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role, permission_entity_1.Permission, user_entity_1.User, page_entity_1.Page])],
        providers: [seedsInitial_1.InitialSeed],
        exports: [seedsInitial_1.InitialSeed],
    })
], SeedsModule);
//# sourceMappingURL=seeds.module.js.map