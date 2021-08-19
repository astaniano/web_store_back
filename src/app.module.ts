import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './modules/users/users.entity';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UtilsModule } from './modules/common/utils.module';
import { Role } from './modules/roles/roles.entity';
import { UserToRoles } from './modules/roles/user-roles.entity';
import { Token } from './modules/token/token.entity';
import { TokenModule } from './modules/token/token.module';

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
      password: process.env.POSTGRESS_USER_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, UserToRoles, Token],
      synchronize: false,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    RolesModule,
    UtilsModule,
  ],
})
export class AppModule {}
