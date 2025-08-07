import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';
import { Permission } from './modules/permissions/entities/permission.entity';
import { JwtModule } from '@nestjs/jwt';
import { SeedsModule } from './seeds/seeds.module';
import { PagesModule } from './modules/pages/pages.module';
import { Page } from './modules/pages/entities/page.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Role, Permission, Page],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'my-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
    SeedsModule,
    PagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}