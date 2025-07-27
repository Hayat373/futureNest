
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { LoginUserDto } from '../users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByUsername(loginUserDto.username);
    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
        return user;
    }
    throw new Error('Invalid credentials'); // This is where the error is thrown
}

createToken(payload: any) {
        return this.jwtService.sign(payload); // Generate JWT token
    }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(loginUserDto);
    
    if (!user) {
        throw new UnauthorizedException(); // Handle invalid login
    }

    const payload = { username: user.username, sub: user.id }; // Include user ID in the payload
    const accessToken = this.jwtService.sign(payload);

    // Return both the access token and user ID
    return {
        access_token: accessToken,
        userId: user.id, // Include user ID in the response
        username: user.username, // Optionally include username or other info
    };
}
}