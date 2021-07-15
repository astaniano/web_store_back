import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

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
    response.cookie('refreshToken', userData.refreshToken, {
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
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }

  @ApiOperation({ summary: 'sign-out the user' })
  @ApiResponse({ status: 200 })
  @Post('/signout')
  async sigout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const tokenData = await this.authService.signout(refreshToken);
    res.clearCookie('refreshToken');
    return tokenData;
  }

  @ApiOperation({ summary: 'sign-out the user' })
  @ApiResponse({ status: 200 })
  @Get('/activate/:link')
  @Redirect()
  async activate(@Param('link') link: string) {
    await this.authService.activate(link);
    return {
      url: process.env.CLIENT_URL,
      statusCode: 301,
    };
  }

  @ApiOperation({ summary: 'refresh token' })
  @ApiResponse({ status: 200 })
  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new HttpException(
        'refresh token was not provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userData = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return userData;
  }
}
