
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entitiy/user.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException('Username or email already exists');
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
  const user = await this.usersRepository.findOne({ where: { username } });
  return user ?? undefined; // Return undefined if user is null
}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;
    const user = await this.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async updateUser( id:number, updateUserDto: UpdateUserDto): Promise<User>{
    const user = await this.usersRepository.findOne({ where:{id}});
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (updateUserDto.email) {
      const existingUser = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException('Email already in use');
      }
    } 

    if (updateUserDto.username) {
      const existingUser = await this.usersRepository.findOne({ where: { username: updateUserDto.username } });
      if (existingUser && existingUser.id !== user.id) {
        throw new ConflictException('Username already in use');
      }
    }

    if(updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}