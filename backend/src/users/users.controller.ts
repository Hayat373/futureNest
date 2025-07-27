
import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, InternalServerErrorException, Param, Put, UnauthorizedException } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from './entitiy/user.entitiy';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

 @Post('login') // Endpoint for user login
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.authService.validateUser(loginUserDto);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials'); // Handle invalid login
        }

        const payload = { username: user.username, sub: user.id }; // Include user ID in the token payload
        const accessToken = this.authService.createToken(payload); // Generate the JWT token

        // Return both the access token and user ID
        return {
            access_token: accessToken,
            userId: user.id, // Include user ID in the response
            username: user.username, // Optionally include username
        };
    }

 @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
}