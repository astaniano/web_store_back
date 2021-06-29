import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from 'src/modules/auth/dto/sign-up.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({ status: 201 })
  @UsePipes(ValidationPipe)
  @Post('/signup')
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.signup(signUpDto);
    response.cookie('refreshToken', userData.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @ApiOperation({ summary: 'sign-in the user' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Post('/signin')
  async signin(
    @Body() userDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.authService.signin(userDto);
    response.cookie('refreshToken', userData.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @Post('/signout')
  sigout(@Body() userDto: SignUpDto) {
    return;
  }

  @Get('/activate/:link')
  @Redirect()
  async activate(@Param('link') link: string) {
    await this.authService.activate(link);
    return {
      url: process.env.CLIENT_URL,
      statusCode: 301,
    };
  }

  @Get('/refresh')
  refresh() {
    return;
  }
}
