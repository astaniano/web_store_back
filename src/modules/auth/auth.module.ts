import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token/token.entity';
import { User } from '../users/users.entity';
import { CommonModule } from '../common/common.module';
import { TokenService } from './token/token.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    SequelizeModule.forFeature([Token, User]),
    CommonModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
