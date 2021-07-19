import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/users.entity';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/roles.entity';
import { UserRolesModel } from './modules/roles/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { Token } from './modules/auth/token/token.entity';
import { CommonModule } from './modules/common/common.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, UserRolesModel, Token],
      synchronize: false,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    CommonModule,
  ],
})
export class AppModule {}
