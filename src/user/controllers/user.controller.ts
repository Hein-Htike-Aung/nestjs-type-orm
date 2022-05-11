import { UserService } from './../services/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../models/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: { name: string }): Observable<User> {
    return this.userService.createUser(body.name);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() body: { name: string },
  ): Observable<User> {
    return this.userService.updateUser(id, body.name);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<User> {
    return this.userService.deleteUser(id);
  }

  @Get()
  getAll(): Observable<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Observable<User> {
    return this.userService.getOneById(id);
  }
}
