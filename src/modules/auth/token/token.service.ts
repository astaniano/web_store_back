import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.entity';
import { JwtService } from '@nestjs/jwt';
import { tokenPayloadDto } from '../dto/token-payload.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenModel: typeof Token,
    private jwtService: JwtService,
  ) {}

  async generateTokens(payload: tokenPayloadDto) {
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
    const tokenData = await this.tokenModel.findOne({ where: { user_id } });
    if (tokenData) {
      tokenData.refresh_token = refresh_token;
      return tokenData.save();
    }
    return await this.tokenModel.create({
      refresh_token,
      user_id,
    });
  }

  async deleteRefreshToken(refresh_token: string) {
    return await this.tokenModel.destroy({
      where: { refresh_token },
    });
  }

  validateRefreshToken(refresh_token: string) {
    return this.jwtService.verify(refresh_token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }

  async findRefreshToken(refresh_token: string) {
    return await this.tokenModel.destroy({
      where: { refresh_token },
    });
  }
}
