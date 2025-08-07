import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findAll(role?: string, page: number = 1, limit: number = 10): Promise<{ users: User[], total: number }> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    
    if (role) {
      queryBuilder.innerJoinAndSelect('user.roles', 'role')
        .where('role.name = :role', { role });
    } else {
      queryBuilder.leftJoinAndSelect('user.roles', 'role');
    }

    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { users, total };
  }
 async findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ 
      where: { id },
      relations: ['roles'] 
    });
  }
  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne({ 
      where: { id },
      relations: ['roles'] 
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ 
      where: { username },
      relations: ['roles'] 
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    // 处理角色关联
    if (userData.roles && userData.roles.length > 0) {
      const roles = await this.rolesRepository.findByIds(
        userData.roles.map(role => role.id)
      );
      userData.roles = roles;
    }

    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    // 处理角色关联
    if (userData.roles && userData.roles.length > 0) {
      const roles = await this.rolesRepository.findByIds(
        userData.roles.map(role => role.id)
      );
      userData.roles = roles;
    }

    await this.usersRepository.update(id, userData);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async search(keyword: string): Promise<User[]> {
    return this.usersRepository.find({
      where: [
        { username: Like(`%${keyword}%`) },
        { real_name: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) }
      ],
      relations: ['roles']
    });
  }
}