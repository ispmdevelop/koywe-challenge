import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto';
import { AuthConfig } from './config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(pass, user.password);

    if (!valid) {
      return null;
    }

    const { password, ...res } = user;
    return res;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    console.log({ signUpDto });
    const newUser = {
      email: signUpDto.email,
      password: bcrypt.hashSync(signUpDto.password, AuthConfig.bcryptSalt),
    } as User;

    const user = await this.userService.create(newUser);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
