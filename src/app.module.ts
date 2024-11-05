import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule, 
    UsersModule, 
    MongooseModule.forRoot(process.env.DATABASE_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
