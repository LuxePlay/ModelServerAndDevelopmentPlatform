import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pagesRepository: Repository<Page>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Page[]> {
    return this.pagesRepository.find({ relations: ['roles'] });
  }

  async findOne(id: number): Promise<Page> {
    return this.pagesRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  async create(pageData: Partial<Page>): Promise<Page> {
    const page = this.pagesRepository.create(pageData);
    return this.pagesRepository.save(page);
  }

  async update(id: number, pageData: Partial<Page>): Promise<Page> {
    await this.pagesRepository.update(id, pageData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pagesRepository.delete(id);
  }

  async setVisible(id: number, visible: boolean): Promise<Page> {
    await this.pagesRepository.update(id, { visible });
    return this.findOne(id);
  }

  async setRoles(pageId: number, roleIds: number[]): Promise<Page> {
    const page = await this.findOne(pageId);
    const roles = await this.rolesRepository.findByIds(roleIds);
    page.roles = roles;
    return this.pagesRepository.save(page);
  }
}