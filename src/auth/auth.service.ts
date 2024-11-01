
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
    async register(username: string, password: string): Promise<any> {
        // Check if the user already exists by email
        try {
            const existingUser = await this.usersService.findOne(username);
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Proceed with password hashing and saving the new user
            return this.usersService.addUser(username, password); // Adjust as needed for your database
        } catch (error) {
            throw error;
        }

    }
}
