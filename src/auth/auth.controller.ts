import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestWithUser } from './jwt.strategy';
import { UserService } from '../user/user.service';

export type AuthBody = { email: string; password: string };
export type CreateUser = { email: string; firsName: string };

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // localhost:3000/auth/login
  @Post('login')
  async login(@Body() authBody: AuthBody) {
    console.log({ authBody });
    return await this.authService.login({ authBody });
  }

  async register(@Body() registerBody: CreateUserDto) {
    console.log({ registerBody });
    return await this.authService.register({
      registerBody,
    });

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticate(@Request() request: RequestWithUser) {
    console.log(request.user);
    return await this.userService.getUser({ userId: request.user.userId });
  }
}
