import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
// import { UserRolesModel } from './user-roles.model';
import { Role } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [RolesService],
})
export class RolesModule {}
