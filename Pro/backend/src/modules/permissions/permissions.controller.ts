import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';

@Controller('permissions')
@UseGuards(RolesGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @Roles('super_admin')
  async findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Roles('super_admin')
  async findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findOne(+id);
  }

  @Post()
  @Roles('super_admin')
  async create(@Body() permissionData: Partial<Permission>): Promise<Permission> {
    return this.permissionsService.create(permissionData);
  }

  @Put(':id')
  @Roles('super_admin')
  async update(@Param('id') id: string, @Body() permissionData: Partial<Permission>): Promise<Permission> {
    return this.permissionsService.update(+id, permissionData);
  }

  @Delete(':id')
  @Roles('super_admin')
  async remove(@Param('id') id: string): Promise<void> {
    return this.permissionsService.remove(+id);
  }

  @Get('check')
  @UseGuards(AuthGuard('jwt'))
  async checkPermission(
    @Request() req,
    @Body() checkDto: { permissionName: string }
  ): Promise<{ hasPermission: boolean }> {
    const hasPermission = await this.permissionsService.checkUserPermission(
      req.user.id,
      checkDto.permissionName
    );
    return { hasPermission };
  }
}