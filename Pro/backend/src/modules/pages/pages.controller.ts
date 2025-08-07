import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { PagesService } from './pages.service';
import { Page } from './entities/page.entity';

@Controller('pages')
@UseGuards(RolesGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @Roles('super_admin')
  async findAll(): Promise<Page[]> {
    return this.pagesService.findAll();
  }

  @Get(':id')
  @Roles('super_admin')
  async findOne(@Param('id') id: string): Promise<Page> {
    return this.pagesService.findOne(+id);
  }

  @Post()
  @Roles('super_admin')
  async create(@Body() pageData: Partial<Page>): Promise<Page> {
    return this.pagesService.create(pageData);
  }

  @Put(':id')
  @Roles('super_admin')
  async update(@Param('id') id: string, @Body() pageData: Partial<Page>): Promise<Page> {
    return this.pagesService.update(+id, pageData);
  }

  @Put(':id/visible')
  @Roles('super_admin')
  async setVisible(@Param('id') id: string, @Body('visible') visible: boolean): Promise<Page> {
    return this.pagesService.setVisible(+id, visible);
  }

  @Put(':id/roles')
  @Roles('super_admin')
  async setRoles(@Param('id') pageId: string, @Body('roleIds') roleIds: number[]): Promise<Page> {
    return this.pagesService.setRoles(+pageId, roleIds);
  }

  @Delete(':id')
  @Roles('super_admin')
  async remove(@Param('id') id: string): Promise<void> {
    return this.pagesService.remove(+id);
  }
}