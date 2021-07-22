import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Token } from '../auth/token/token.entity';
// import { Role } from '../roles/roles.entity';
// import { UserRolesModel } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    // TypeOrmModule.forFeature([User, Role, UserRolesModel, Token]),
    TypeOrmModule.forFeature([User]),
    // RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
