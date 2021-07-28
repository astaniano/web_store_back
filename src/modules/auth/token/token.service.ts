import { Injectable } from '@nestjs/common';
import { Token } from './token.entity';
import { JwtService } from '@nestjs/jwt';
import { tokenPayloadDto } from '../dto/token-payload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepo: Repository<Token>,
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
    const [token] = await this.tokenRepo.find({ where: { user_id } });
    if (token) {
      // we update the record that already exists
      token.refresh_token = refresh_token;
      return await this.tokenRepo.save(token);
    }

    // create a new record
    return await this.tokenRepo.save({
      refresh_token,
      user_id,
    });
  }

  // async deleteRefreshToken(refresh_token: string) {
  //   return await this.tokenModel.destroy({
  //     where: { refresh_token },
  //   });
  // }

  // validateRefreshToken(refresh_token: string) {
  //   return this.jwtService.verify(refresh_token, {
  //     secret: process.env.JWT_REFRESH_SECRET,
  //   });
  // }

  // async findRefreshToken(refresh_token: string) {
  //   return await this.tokenModel.destroy({
  //     where: { refresh_token },
  //   });
  // }
}
