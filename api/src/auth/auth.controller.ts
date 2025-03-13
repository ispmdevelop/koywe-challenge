import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthenticationResponse } from './responses/authentication.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({
    summary: 'Login',
    description: 'Login with email and password',
  })
  @ApiResponse({
    status: 201,
    description: 'User logged in',
    type: AuthenticationResponse,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() _: LoginDto) {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Sign up',
    description: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: AuthenticationResponse,
  })
  @ApiResponse({ status: 404, description: 'Email already in use' })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const user = await this.userService.findByEmail(signUpDto.email);

    if (user) {
      throw new BadRequestException('Email already in use');
    }

    return await this.authService.signUp(signUpDto);
  }
}
