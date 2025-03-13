import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationResponse {
  @ApiProperty({ example: 'user access token' })
  access_token: string;
}
