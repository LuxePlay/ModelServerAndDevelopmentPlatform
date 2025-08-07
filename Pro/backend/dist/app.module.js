"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./modules/users/users.module");
const roles_module_1 = require("./modules/roles/roles.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_entity_1 = require("./modules/users/entities/user.entity");
const role_entity_1 = require("./modules/roles/entities/role.entity");
const permission_entity_1 = require("./modules/permissions/entities/permission.entity");
const jwt_1 = require("@nestjs/jwt");
const seeds_module_1 = require("./seeds/seeds.module");
const pages_module_1 = require("./modules/pages/pages.module");
const page_entity_1 = require("./modules/pages/entities/page.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'database.sqlite',
                entities: [user_entity_1.User, role_entity_1.Role, permission_entity_1.Permission, page_entity_1.Page],
                synchronize: true,
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: 'my-secret-key',
                signOptions: { expiresIn: '60m' },
            }),
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            auth_module_1.AuthModule,
            seeds_module_1.SeedsModule,
            pages_module_1.PagesModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map