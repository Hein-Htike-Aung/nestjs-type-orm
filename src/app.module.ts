import { Pet } from './pet.entity';
import { User } from './user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, Pet])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
