import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token/token.model';
import { User } from '../users/users.model';
import { CommonModule } from '../common/common.module';
import { TokenService } from './token/token.service';

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
