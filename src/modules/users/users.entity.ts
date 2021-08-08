import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Token } from '../auth/token/token.entity';
import { UserToRoles } from '../roles/user-roles.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'any@tttttt.com', description: 'email' })
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @Column({ type: 'varchar', length: 200 })
  password: string;

  @ApiProperty({ example: 'john', description: 'first name' })
  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @ApiProperty({ example: 'smith', description: 'last name' })
  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'is_activated', type: 'boolean', default: false })
  isActivated: boolean;

  @Column({ name: 'activation_link', type: 'varchar', length: 300 })
  activationLink: string;

  @OneToOne(() => Token, (token: Token) => token.user)
  token: Token;

  @OneToMany(() => UserToRoles, (userToRoles) => userToRoles.user, {
    cascade: true,
  })
  public userToRoles: UserToRoles[];
}
