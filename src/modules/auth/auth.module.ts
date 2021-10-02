import { forwardRef, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UtilsModule } from '../common/utils.module';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule), UtilsModule, TokenModule],
  exports: [AuthService],
})
export class AuthModule {}
