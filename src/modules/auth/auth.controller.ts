import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import {RefreshToken} from "./decorators/refresh-token/refresh-token.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() data: SignInDto, @Res() res: Response) {
    return this.authService.signIn(data, res);
  }

  @Patch('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Patch('refresh')
  async refresh(@RefreshToken() refreshToken: string, @Res() res: Response) {
    return this.authService.refresh(refreshToken, res);
  }
}
