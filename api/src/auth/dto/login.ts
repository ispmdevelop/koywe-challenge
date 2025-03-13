import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Your email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'pass123', description: 'Your password' })
  @IsString()
  password: string;
}
