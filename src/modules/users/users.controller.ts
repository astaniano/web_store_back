import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GrantRoleDto } from './dto/grant-role.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ValidationPipe } from '../../pipes/validation.pipe';

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

  @Get()
  test() {
    return 'test successful';
  }
}
