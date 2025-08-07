import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { Role } from '../roles/entities/role.entity';
export declare class PagesService {
    private pagesRepository;
    private rolesRepository;
    constructor(pagesRepository: Repository<Page>, rolesRepository: Repository<Role>);
    findAll(): Promise<Page[]>;
    findOne(id: number): Promise<Page>;
    create(pageData: Partial<Page>): Promise<Page>;
    update(id: number, pageData: Partial<Page>): Promise<Page>;
    remove(id: number): Promise<void>;
    setVisible(id: number, visible: boolean): Promise<Page>;
    setRoles(pageId: number, roleIds: number[]): Promise<Page>;
}
