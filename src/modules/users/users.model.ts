import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  HasOne,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/modules/roles/roles.model';
import { UserRolesModel } from 'src/modules/roles/user-roles.model';
import { Token } from '../auth/token/token.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'any@tttttt.com', description: 'email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'john', description: 'first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @ApiProperty({ example: 'smith', description: 'last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean;

  @Column({ type: DataType.STRING })
  activationLink: string;

  @HasOne(() => Token)
  token: Token;

  @BelongsToMany(() => Role, () => UserRolesModel)
  roles: Role[];
}
