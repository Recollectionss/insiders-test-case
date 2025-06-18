import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from './jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../../config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from './config/jwt.module.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [
    UserModule,
    ConfigModule.forRoot({ load: [jwtConfig] }),
    JwtModule.registerAsync(jwtModuleConfig),
  ],
})
export class AuthModule {}
