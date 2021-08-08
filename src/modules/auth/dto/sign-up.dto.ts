import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'any@tttttt.com', description: 'email' })
  @IsString({ message: 'must be a string' })
  @IsEmail({}, { message: 'email is not validated' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  @IsString({ message: 'must be a string' })
  @Length(4, 16, {
    message: 'can not be less than 4 and not longer than 16 symbols',
  })
  readonly password: string;

  @ApiProperty({ example: 'john', description: 'first name of the user' })
  @IsString({ message: 'must be a string' })
  @Length(4, 20, {
    message: 'can not be less than 4 and not longer than 20 symbols',
  })
  readonly firstName: string;

  @ApiProperty({ example: 'smith', description: 'last name of the user' })
  @IsString({ message: 'must be a string' })
  @Length(4, 20, {
    message: 'can not be less than 4 and not longer than 20 symbols',
  })
  readonly lastName: string;
}
