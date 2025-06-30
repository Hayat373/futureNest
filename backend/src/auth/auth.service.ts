import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
     private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(username: string) {
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}