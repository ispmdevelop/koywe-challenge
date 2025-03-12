import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  logIn(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post()
  singUp(@Body() createAuthDto: SignUpDto) {
    return this.authService.login(createAuthDto);
  }
}
