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

  @ApiOperation({ summary: 'grant a role' })
  @ApiResponse({ status: 200 })
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserProfile(@Param() params, @Res() res: Response) {
    res.sendFile(path.resolve(__dirname + '/../../../user_photos/32.jpeg'));
  }
}
