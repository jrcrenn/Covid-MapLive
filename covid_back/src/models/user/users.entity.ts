import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true }) firstName?: string;

  @Column({ nullable: true }) lastName?: string;

  @Column() email?: string;

  @Column({ select: false, nullable: true })
  password?: string;

  @Column({ select: false, nullable: true })
  salt?: string;

  @Column({ default: false, nullable: true })
  isAdmin?: boolean;
}
