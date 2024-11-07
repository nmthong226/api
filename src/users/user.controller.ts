// src/users/users.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard) // Protect the route with JWT
    @Get('profile')
    async getProfile(@Req() req) {
        // `req.user` contains the user ID and username from the decoded token
        return this.usersService.getUserProfile(req.user.userId);
    }
}
