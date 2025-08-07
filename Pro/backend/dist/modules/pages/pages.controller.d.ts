import { PagesService } from './pages.service';
import { Page } from './entities/page.entity';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    findAll(): Promise<Page[]>;
    findOne(id: string): Promise<Page>;
    create(pageData: Partial<Page>): Promise<Page>;
    update(id: string, pageData: Partial<Page>): Promise<Page>;
    setVisible(id: string, visible: boolean): Promise<Page>;
    setRoles(pageId: string, roleIds: number[]): Promise<Page>;
    remove(id: string): Promise<void>;
}
