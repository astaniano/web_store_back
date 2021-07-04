import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/users/users.model';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/roles.model';
import { UserRolesModel } from './modules/roles/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { Token } from './modules/auth/token/token.model';
import { CommonModule } from './modules/common/common.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRolesModel, Token],
      autoLoadModels: false,
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
