import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller'; 
import { AuthService } from './auth/auth.service';
import { User } from './users/entitiy/user.entitiy';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';

import { UserModule } from './users/users.module';
import { CapsuleModule } from './capsule/capsule.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Hayat123@3',
      database: 'timecapsule',
      entities: [User], // Add more entities if needed
      synchronize: true, // Set to false in production
    }),
    UserModule,
    CapsuleModule,
     AuthModule,
  
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}