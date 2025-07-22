
import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

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

 @Post('login')
  @UseInterceptors(FileInterceptor('profileImage'))
  async login(
    @Body() loginUserDto: LoginUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.authService.validateUser(loginUserDto); // Make sure validateUser exists in the UserService
    const payload = { username: user.username, sub: user.id };
    
    // Handle file storage logic here (e.g., save to database)
    if (file) {
      // Save the file to the database or filesystem
      // e.g., user.profileImage = file.path; // Adjust according to your logic
    }

    const accessToken = await this.authService.login(loginUserDto); // Use AuthService to generate the token
    
    return {
      access_token: accessToken.access_token,
    };
} catch (error) {
    console.error('Error during login:', error); // Log the error
    throw new InternalServerErrorException('Login failed'); // Provide a user-friendly error message
  }}  