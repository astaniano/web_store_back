import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserToRoles } from './user-roles.entity';

// interface RoleCreationAttrs {
//   value: string;
//   description: string;
// }

@Entity('roles')
export class Role {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'role unique value' })
  @Column({ type: 'varchar', length: 100, unique: true })
  value: string;

  @ApiProperty({
    example: 'administrator',
    description: 'describes what user can do',
  })
  @Column()
  description: string;

  @OneToMany(() => UserToRoles, (userToRoles) => userToRoles.role)
  public userToRoles: UserToRoles[];
}
