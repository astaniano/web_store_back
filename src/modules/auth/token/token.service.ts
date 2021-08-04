import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Token } from './token.entity';
import { User } from '../../users/users.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  async generateTokens(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(user_id: number, refresh_token: string) {
    return await this.tokenRepo.save({ refresh_token, user_id });
  }

  async updateRefreshToken(token: Token) {
    return await this.tokenRepo.save(token);
  }

  async deleteRefreshToken(refresh_token: string) {
    return await this.tokenRepo.delete({ refresh_token });
  }

  validateRefreshToken(refresh_token: string) {
    return this.jwtService.verify(refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  async findRefreshToken(refresh_token: string) {
    return await this.tokenRepo.findOne({
      where: { refresh_token },
    });
  }

  async findRefreshTokenByUserId(user_id: number) {
    return await this.tokenRepo.findOne({ where: { user_id } });
  }
}
