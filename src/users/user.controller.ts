// src/users/users.controller.ts
import { Controller, Get, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(JwtAuthGuard) // Protect the route with JWT
    @Get('profile')
    async getProfile(@Req() req) {
      // `req.user` contains the decoded payload from the token (e.g., userId and email)
      const user = await this.usersService.getUserProfile(req.user.sub);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
    
}
