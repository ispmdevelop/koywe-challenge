import { Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return 'Login handler';
  }

  singUp(signUp: SignUpDto) {
    return `signup handler`;
  }
}
