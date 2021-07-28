import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';
import { Token } from './token.entity';

@Module({
  providers: [TokenService],
  imports: [TypeOrmModule.forFeature([Token]), JwtModule.register({})],
  exports: [TokenService],
})
export class TokenModule {}
