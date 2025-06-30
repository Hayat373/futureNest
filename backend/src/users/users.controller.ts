import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entitiy/user.entitiy';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userData: { username: string; email: string; password: string }) {
    return this.userService.createUser(userData.username, userData.email, userData.password);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<User>) {
    return this.userService.updateUser(id, updateData);
  }
}