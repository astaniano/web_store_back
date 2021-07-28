import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilsModule } from '../common/utils.module';
import { UsersModule } from '../users/users.module';
import { TokenModule } from './token/token.module';
import { RolesGuard } from './roles.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    UtilsModule,
    TokenModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
