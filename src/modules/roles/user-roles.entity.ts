import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Role } from './roles.entity';

@Entity('user_to_roles')
export class UserToRoles {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1', description: 'id of the user' })
  @Column({ name: 'user_id' })
  user_id: number;

  @ApiProperty({ example: '1', description: 'id of the role' })
  @Column({ name: 'role_id' })
  role_id: number;

  @ManyToOne(() => User, (user: User) => user.userToRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role: Role) => role.userToRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
