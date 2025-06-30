import { Controller, Post, Body, UseGuards, Put, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
}

//   @Post('register')
//   @UseInterceptors(FileInterceptor('image', {
//     storage: diskStorage({
//       destination: './uploads',
//       filename: (req, file, cb) => {
//         const name = file.originalname.split('.')[0];
//         const fileExt = extname(file.originalname);
//         cb(null, `${name}-${Date.now()}${fileExt}`);
//       },
//     }),
//     fileFilter: (req, file, cb) => {
//       const filetypes = /jpeg|jpg|png/;
//       const extnameValid = filetypes.test(extname(file.originalname).toLowerCase());
//       const mimetypeValid = filetypes.test(file.mimetype);
//       if (extnameValid && mimetypeValid) {
//         cb(null, true);
//       } else {
//         cb(new Error('Images only (jpeg, jpg, png)!'), false);
//       }
//     },
//   }))
//   async register(
//     @Body() createUserDto: CreateUserDto,
//     @UploadedFile() file?: Express.Multer.File,
//   ): Promise<{ token: string }> {
//     return this.authService.createUser(createUserDto, file);
//   }

//   @Post('login')
//   async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
//     return this.authService.login(loginDto);
//   }

//   @Put('update/:id')
//   @UseGuards(JwtAuthGuard)
//   @UseInterceptors(FileInterceptor('image', {
//     storage: diskStorage({
//       destination: './uploads',
//       filename: (req, file, cb) => {
//         const name = file.originalname.split('.')[0];
//         const fileExt = extname(file.originalname);
//         cb(null, `${name}-${Date.now()}${fileExt}`);
//       },
//     }),
//     fileFilter: (req, file, cb) => {
//       const filetypes = /jpeg|jpg|png/;
//       const extnameValid = filetypes.test(extname(file.originalname).toLowerCase());
//       const mimetypeValid = filetypes.test(file.mimetype);
//       if (extnameValid && mimetypeValid) {
//         cb(null, true);
//       } else {
//         cb(new Error('Images only (jpeg, jpg, png)!'), false);
//       }
//     },
//   }))
//   async update(
//     @Param('id') id: string,
//     @Body() updateUserDto: UpdateUserDto,
//     @UploadedFile() file?: Express.Multer.File,
//   ): Promise<void> {
//     return this.authService.updateUser(id, updateUserDto, file);
//   }

//   @Post('logout')
//   @UseGuards(JwtAuthGuard)
//   async logout(): Promise<void> {
//     return this.authService.logout();
//   }
// }