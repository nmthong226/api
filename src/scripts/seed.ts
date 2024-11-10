// scripts/seed.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';
import { UsersService } from '../../src/users/users.service';
import * as bcrypt from 'bcryptjs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const users = [
    {
      username: "JaneDoe",
      email: "janedoe123@gmail.com",
      password: "janedoe123",
      createdAt: new Date(),
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await usersService.createUser(user.username, user.email, hashedPassword);
  }

  await app.close();
}

bootstrap().catch((err) => {
  console.error("Seeding error", err);
});
