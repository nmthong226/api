// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, pass: string): Promise<any> {
    // Check if the user exists
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    // Verify the password
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
  
    // Generate JWT token
    const token = this.generateJwt(user._id as string, user.email);
  
    // Return user data and token
    return {
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt
      },
      token,
    };
  }
  

  async register(username: string, email: string, password: string): Promise<any> {
    // Check if the user already exists
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const newUser = await this.usersService.createUser(username, email, hashedPassword);
    return { message: 'User registered successfully', userId: newUser._id };
  }

  private generateJwt(userId: string, email: string): string {
    // JWT secret should be stored securely in environment variables
    const secret = process.env.JWT_SECRET;
    const payload = { sub: userId, email };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
  }
}
