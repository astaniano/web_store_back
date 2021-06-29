import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GrantRoleDto {
  @ApiProperty({
    example: 'USER',
    description: 'value of the role exmp. USER or ADMIN etc...',
  })
  @IsString({ message: 'must be a string' })
  readonly value: string;

  @ApiProperty({
    example: '1`',
    description: 'id of the user who will be granted with this role',
  })
  @IsNumber({}, { message: 'must be a number' })
  readonly userId: number;
}
