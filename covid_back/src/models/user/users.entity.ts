import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Settings } from './settings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true }) firstName?: string;

  @Column({ nullable: true }) lastName?: string;

  @Column({ nullable: true }) email?: string;

  @Column({ select: false, nullable: true })
  password?: string;

  @Column({ select: false, nullable: true })
  salt?: string;

  @Column({ default: false, nullable: true })
  isAdmin?: boolean;

  @OneToMany(() => Settings, settings => settings.user, { nullable: true })
  settings?: Settings[];
}
