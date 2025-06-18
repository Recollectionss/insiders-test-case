import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  RequestTimeoutException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import jwtConfig from '../../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserJwtDataDto } from '../dto/user-jwt-data.dto';

@Injectable()
export class AuthJwtService {
  private readonly privateKey: Buffer;
  constructor(
    private jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
  ) {
    this.privateKey = fs.readFileSync(
      path.join(__dirname, '../../../keys/public.pem'),
    );
  }

  generateTokens(payload: UserJwtDataDto) {
    return {
      refreshToken: this.generateRefreshToken(payload),
      accessToken: this.generateAccessToken(payload),
    };
  }

  async verify(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      return;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new RequestTimeoutException('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        throw new ForbiddenException('Invalid JWT token');
      } else {
        throw new InternalServerErrorException('Token validation error');
      }
    }
  }

  private generateRefreshToken(payload: UserJwtDataDto): string {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: this.privateKey,
      expiresIn: this.jwtConf.refresh_ttl,
      issuer: this.jwtConf.iss,
    });
  }

  private generateAccessToken(payload: UserJwtDataDto): string {
    return this.jwtService.sign(payload, {
      algorithm: 'RS256',
      privateKey: this.privateKey,
      expiresIn: this.jwtConf.access_ttl,
      issuer: this.jwtConf.iss,
    });
  }
}
