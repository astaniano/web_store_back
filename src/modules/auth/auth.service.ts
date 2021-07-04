import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/modules/auth/dto/sign-up.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/users/users.model';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../common/mailer/mail.service';
import { SignInDto } from './dto/sign-in.dto';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    const candidate = await this.userService.getUserByEmail(signUpDto.email);
    if (candidate) {
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(signUpDto.password, 5);
    const activationLink = uuidv4(); // e.g. v34fa-asfasf-142saf-sa-asf

    const user = await this.userService.createUser(<User>{
      ...signUpDto,
      password: hashedPassword,
      activation_link: activationLink,
    });

    await this.mailService.sendActivationMail(
      signUpDto.email,
      `${process.env.SERVER_URL}/auth/activate/${activationLink}`,
    );

    return this.createResponseWithTokens(user);
  }

  async signin(userDto: SignInDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
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

    return this.createResponseWithTokens(user);
  }

  async signout(refresh_token: string) {
    return this.tokenService.deleteRefreshToken(refresh_token);
  }

  async activate(activationLink: string) {
    const user = await this.userService.getUserByActivationLink(activationLink);
    if (!user) {
      throw new HttpException('wrong activation link', HttpStatus.BAD_REQUEST);
    }

    user.is_activated = true;
    await user.save();
  }

  async refresh(refresh_token: string) {
    const userData = this.tokenService.validateRefreshToken(refresh_token);
    const tokenFromDB = await this.tokenService.findRefreshToken(refresh_token);
    if (!userData || !tokenFromDB) {
      throw new HttpException(
        'could not verify refresh token',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.findById(userData.id);
    return await this.createResponseWithTokens(user);
  }

  private async createResponseWithTokens(user: User) {
    const payloadForTokens = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    const tokens = await this.tokenService.generateTokens(payloadForTokens);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    user.password = '';
    return { ...tokens, user };
  }
}
