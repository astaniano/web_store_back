import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Token } from './token.entity';
import { User } from '../users/users.entity';

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

  async saveRefreshToken(userId: number, refreshToken: string) {
    return await this.tokenRepo.save({ refreshToken, userId });
  }

  async updateRefreshToken(token: Token) {
    return await this.tokenRepo.save(token);
  }

  async deleteRefreshToken(refreshToken: string) {
    return await this.tokenRepo.delete({ refreshToken });
  }

  validateToken(token: string, secret: string) {
    return this.jwtService.verify(token, { secret });
  }

  async findRefreshToken(refreshToken: string) {
    return await this.tokenRepo.findOne({
      where: { refreshToken },
    });
  }

  async findRefreshTokenByUserId(userId: number) {
    return await this.tokenRepo.findOne({ where: { userId } });
  }
}
