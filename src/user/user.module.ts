import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './models/user.entity';
import { Pet } from './models/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Pet]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
