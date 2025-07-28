import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './entitiy/user.entitiy';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from 'src/email/email.service';

@Module({
 imports: [TypeOrmModule.forFeature([User]),
 forwardRef(() => AuthModule)],  
 controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService],
})

export class UserModule {}