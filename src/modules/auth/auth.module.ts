import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from './jwt/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [UserModule],
})
export class AuthModule {}
