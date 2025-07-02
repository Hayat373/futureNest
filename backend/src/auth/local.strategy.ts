import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'username' }); // Specify username field
  }

  async validate(username: string, password: string) {
    const user = await this.userService.validateUser({ username, password });
    return user;
  }
}