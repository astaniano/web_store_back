import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { MailService } from '../common/mailer/mail.service';
import { SignInDto } from './dto/sign-in.dto';
import { TokenService } from './token/token.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { Token } from './token/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const candidate = await this.userService.findUserByEmail(signUpDto.email);
    if (candidate) {
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 5);
    const activationLink = uuidv4(); // e.g. v34fa-asfasf-142saf-sa-asf

    await this.userService.createUser(<User>{
      ...signUpDto,
      password: hashedPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(
      signUpDto.email,
      `${process.env.SERVER_URL}/auth/activate/${activationLink}`,
    );

    return 'user has been created';
  }

  async signin(userDto: SignInDto) {
    const user = await this.userService.findUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordEqual = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!isPasswordEqual) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.generateResponseWithTokens(user, null);
  }

  async signout(refresh_token: string) {
    return this.tokenService.deleteRefreshToken(refresh_token);
  }

  async activate(activationLink: string) {
    const user = await this.userService.findUserByActivationLink(
      activationLink,
    );
    if (!user) {
      throw new HttpException('wrong activation link', HttpStatus.BAD_REQUEST);
    }

    user.isActivated = true;
    await this.userService.updateUser(user);
  }

  async refresh(refresh_token: string) {
    const userData = this.tokenService.validateRefreshToken(refresh_token);
    const recordWithToken = await this.tokenService.findRefreshToken(
      refresh_token,
    );
    if (!userData || !recordWithToken) {
      throw new HttpException(
        'could not verify refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.findUserById(userData.id);
    return await this.generateResponseWithTokens(user, recordWithToken);
  }

  private async generateResponseWithTokens(user: User, recordWithToken: Token) {
    const tokens = await this.tokenService.generateTokens(user);

    if (recordWithToken !== null) {
      recordWithToken.refresh_token = tokens.refreshToken;
      await this.tokenService.updateRefreshToken(recordWithToken);
    } else {
      await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    }

    user.password = '';
    return { ...tokens, user };
  }
}
