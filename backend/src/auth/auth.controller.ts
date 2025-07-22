import { Controller, Post, Body, UseInterceptors, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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