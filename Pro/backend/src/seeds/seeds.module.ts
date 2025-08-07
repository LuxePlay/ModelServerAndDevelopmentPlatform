import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitialSeed } from './seedsInitial';
import { Role } from '../modules/roles/entities/role.entity';
import { Permission } from '../modules/permissions/entities/permission.entity';
import { User } from '../modules/users/entities/user.entity';
import { Page } from '../modules/pages/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, User, Page])],
  providers: [InitialSeed],
  exports: [InitialSeed],
})
export class SeedsModule {}