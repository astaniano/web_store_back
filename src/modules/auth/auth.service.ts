import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/modules/auth/dto/sign-up.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/users/users.model';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { MailService } from '../common/mailer/mail.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectModel(Token) private tokenModel: typeof Token,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async signin(userDto: SignInDto) {
    const userInDB = await this.userService.getUserByEmail(userDto.email);
    if (!userInDB) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordEqual = await bcrypt.compare(
      userDto.password,
      userInDB.password,
    );
    if (!isPasswordEqual) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      email: userInDB.email,
      id: userInDB.id,
      roles: userInDB.roles,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' });

    await this.tokenModel.create({
      refresh_token,
      user_id: userInDB.id,
    });

    userInDB.password = '';
    return { access_token, refresh_token, user: userInDB };
  }

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

    const createdUser = await this.userService.createUser(<User>{
      ...signUpDto,
      password: hashedPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(
      signUpDto.email,
      `${process.env.API_URL}/auth/activate/${activationLink}`,
    );

    const payload = {
      email: createdUser.email,
      id: createdUser.id,
      roles: createdUser.roles,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '30m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' });

    await this.tokenModel.create({
      refresh_token,
      user_id: createdUser.id,
    });

    createdUser.password = '';
    return { access_token, refresh_token, user: createdUser };
  }

  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ where: { activationLink } });

    if (!user) {
      throw new HttpException('wrong activation link', HttpStatus.BAD_REQUEST);
    }

    user.isActivated = true;
    await user.save();
  }
}
