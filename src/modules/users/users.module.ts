import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    forwardRef(() => AuthModule),
    TokenModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
