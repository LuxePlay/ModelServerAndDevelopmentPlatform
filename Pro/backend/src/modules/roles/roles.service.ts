import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({ relations: ['permissions'] });
  }

  async findOne(id: number): Promise<Role> {
    return await this.rolesRepository.findOne({ 
      where: { id },
      relations: ['permissions'] 
    });
  }

  async findByName(name: string): Promise<Role | undefined> {
    return await this.rolesRepository.findOne({ where: { name } });
  }

  async create(roleData: Partial<Role>): Promise<Role> {
    const role = this.rolesRepository.create(roleData);
    return await this.rolesRepository.save(role);
  }

  async update(id: number, roleData: Partial<Role>): Promise<Role> {
    await this.rolesRepository.update(id, roleData);
    return await this.rolesRepository.findOne({ 
      where: { id },
      relations: ['permissions'] 
    });
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}