import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule], 
})
export class AuthModule {}