
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
import { EmailService } from '../email/email.service'; // Assuming you have an EmailService for sending emails


@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
     private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
     console.log('DTO received in service:', createUserDto); 
    const { username, email, password, image } = createUserDto; // Destructure profileImage

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      image, // Include profileImage here
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

async findByEmail(email:string):Promise<User| null>{
  return this.usersRepository.findOne({ where: { email } });
}

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;
    const user = await this.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async saveResetToken(userId: number, token: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (user) {
        user.resetToken = token; // Assuming resetToken is a field in User entity
        user.resetTokenExpires = new Date(Date.now() + 3600000); // Set expiration to 1 hour from now
        await this.usersRepository.save(user);
    }
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

    async sendMail(email: string, resetLink: string) {
    if (!this.emailService) {
      throw new Error('Email service is not defined');
    }
    await this.emailService.sendMail(email, resetLink);
  }

}