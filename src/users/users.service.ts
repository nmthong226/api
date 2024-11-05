import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    // Use MongoDB query to find a user by username
    return this.userModel.findOne({ email }).exec();
  }
  async createUser(username:string, email: string, password: string): Promise<User> {
    const newUser = new this.userModel({ username, email, password, createdAt: new Date() });
    return newUser.save();
  }
}
