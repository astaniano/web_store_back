import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
// import { Role } from '../roles/roles.entity';
// import { UserRolesModel } from '../roles/user-roles.model';
// import { Token } from '../auth/token/token.entity';

// interface UserCreationAttrs {
//   email: string;
//   password: string;
//   first_name: string;
//   last_name: string;
// }

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
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @ApiProperty({ example: 'smith', description: 'last name' })
  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'boolean', default: false })
  isActivated: boolean;

  @Column({ type: 'varchar', length: 300 })
  activationLink: string;

  // @OneToOne(() => Token, (token) => token.user)
  // token: Token;

  // @BelongsToMany(() => Role, () => UserRolesModel)
  // roles: Role[];
}
