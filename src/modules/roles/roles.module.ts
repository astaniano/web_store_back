import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRolesModel } from './user-roles.model';
import { Role } from './roles.entity';
import { User } from '../users/users.entity';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRolesModel])],
  exports: [RolesService],
})
export class RolesModule {}
