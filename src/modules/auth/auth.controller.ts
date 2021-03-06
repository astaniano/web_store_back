import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request, Express } from 'express';

import { AuthService } from './auth.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { imageFileFilter } from '../common/image_handler/file-upload-filter';
import { userDataDto } from './dto/user-data.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({ status: 201 })
  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('userPhoto', {
      limits: { fileSize: 1024 * 1024 },
      fileFilter: imageFileFilter,
    }),
  )
  @UsePipes(ValidationPipe)
  async signup(
    @UploadedFile() file: Express.Multer.File,
    @Body() signUpDto: SignUpDto,
  ): Promise<number> {
    return await this.authService.signup(signUpDto, file.buffer);
  }

  @ApiOperation({ summary: 'sign-in the user' })
  @ApiResponse({ status: 200 })
  @UsePipes(ValidationPipe)
  @Post('/signin')
  async signin(
    @Body() userDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<userDataDto> {
    const userData = await this.authService.signin(userDto);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    response.statusCode = HttpStatus.OK;
    return userData;
  }

  @ApiOperation({ summary: 'sign-out the user' })
  @ApiResponse({ status: 200 })
  @Post('/signout')
  @HttpCode(200)
  async signout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const tokenData = await this.authService.signout(refreshToken);
    res.clearCookie('refreshToken');
    return tokenData;
  }

  @ApiOperation({ summary: "confirm user's email" })
  @ApiResponse({ status: 301 })
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
  @HttpCode(200)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<userDataDto> {
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
