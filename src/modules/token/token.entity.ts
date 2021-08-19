import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

// interface TokenCreationAttrs {
//   refresh_token: string;
//   user_id: number;
// }

@Entity('tokens')
export class Token {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'fasdiofjsaf', description: 'refresh token' })
  @Column({ name: 'refresh_token', type: 'varchar', length: 450 })
  refreshToken: string;

  @ApiProperty({ example: '1', description: 'id of the user' })
  @Column({ name: 'user_id' })
  userId: number;

  @OneToOne(() => User, (user: User) => user.token)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
