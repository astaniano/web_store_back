import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GrantRoleDto } from './dto/grant-role.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'grant a role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post('/role')
  grantRole(@Body() dto: GrantRoleDto) {
    return this.usersService.grantRole(dto);
  }

  @Get('test')
  async test() {
    return 'it works';
  }

  @Get('test/create')
  async test2() {
    return this.usersService.createUserTest();
  }

  @Get('test/get')
  async test3() {
    return this.usersService.getCreatedUserTest();
  }

  // http://localhost:5000/users/test
  // http://localhost:5000/users/test/create
  // http://localhost:5000/users/test/get

  @ApiOperation({ summary: 'grant a role' })
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserPhoto(@Param() params, @Res() res: Response) {
    const readStream = await this.usersService.getUserPhoto(params.id);
    readStream.pipe(res);
  }
}
