import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('super_admin', 'admin')
  async findAll(
    @Query('role') role?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<{ users: User[], total: number }> {
    return this.usersService.findAll(role, page, limit);
  }

  @Post()
  @Roles('super_admin')
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  @Roles('super_admin')
  async update(@Param('id') id: string, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.update(+id, userData);
  }

  @Delete(':id')
  @Roles('super_admin')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }

  @Get('search')
  @Roles('super_admin')
  async search(@Query('keyword') keyword: string): Promise<User[]> {
    return this.usersService.search(keyword);
  }
}