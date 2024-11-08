import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { Email: string; Password: string }) {
    return this.authService.signIn(signInDto.Email, signInDto.Password);
  }
  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string; }) {
    const { username, password, email } = body;
    // Manually check for required fields
    if (!username || !password) {
      throw new Error('Missing required fields');
    }
    return this.authService.register(username, email, password);
  }
}