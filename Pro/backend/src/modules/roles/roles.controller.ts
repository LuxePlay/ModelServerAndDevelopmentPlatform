import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Controller('roles')
@UseGuards(RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles('super_admin')
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles('super_admin')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  @Post()
  @Roles('super_admin')
  async create(@Body() roleData: Partial<Role>): Promise<Role> {
    return this.rolesService.create(roleData);
  }

  @Put(':id')
  @Roles('super_admin')
  async update(@Param('id') id: string, @Body() roleData: Partial<Role>): Promise<Role> {
    return this.rolesService.update(+id, roleData);
  }

  @Delete(':id')
  @Roles('super_admin')
  async remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
}