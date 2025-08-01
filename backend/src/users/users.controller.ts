
import { Controller, Post, Body, UseGuards, UseInterceptors, UploadedFile, InternalServerErrorException, Param, Put, UnauthorizedException, Req, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from './entitiy/user.entitiy';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads', // Destination folder for files
      filename: (req, file, cb) => {
        const uniqueFilename = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueFilename); // Save with a unique name
      },
    }),
  }))
  async signup(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (!file) {
      throw new InternalServerErrorException('File is required');
    }

    const profileImagePath = file.path; // Get the file path

    // Pass the profile image path to the DTO or modify the DTO to include it
    const userData = {
      ...createUserDto,
      image: profileImagePath,
    };
    console.log('User Data to be Saved:', userData); 

    return this.userService.create(userData); // Pass user data to the service
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
    @Post('logout')
    logout(@Req() request: Request, @Res() response: Response) {
        // Handle logout logic, such as invalidating the token
        // This is a placeholder; actual implementation may vary
        response.clearCookie('jwt'); // Example of clearing a JWT cookie
        return response.status(200).send({ message: 'Logged out successfully' });
    }
    

 @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Post('forgot-password')
  async forgotpassword(@Body('email') email:string ){
    const result = await this.authService.sendPasswordResetEmail(email);
    return result;
  }
}