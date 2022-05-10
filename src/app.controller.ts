import { Observable } from 'rxjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUser(@Body() body: { name: string }): Observable<User> {
    return this.appService.createUser(body.name);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Observable<User> {
    return this.appService.updateUser(id, body.name);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<User> {
    return this.appService.deleteUser(id);
  }

  @Get()
  getAll(): Observable<User[]> {
    return this.appService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Observable<User> {
    return this.appService.getOneById(id);
  }
}
