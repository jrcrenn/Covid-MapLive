import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Settings {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: true }) type?: string;

    @Column({ nullable: true }) options?: string;

    @ManyToOne(() => User, user => user.id)
    user?: User;
} 