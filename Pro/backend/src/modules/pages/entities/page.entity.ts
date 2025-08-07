import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  label: string;

  @Column({ default: true })
  visible: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  order: number;

  @Column({ nullable: true })
  parentId: number;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'page_roles',
    joinColumn: { name: 'page_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
  })
  roles: Role[];
}