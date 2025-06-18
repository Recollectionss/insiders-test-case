import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { HashingService } from './hashing/hashing.service';
import { AuthJwtService } from './jwt/auth-jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly authJwtService: AuthJwtService,
  ) {}

  async signUp(data: SignUpDto) {}

  async signIn(data: SignInDto,res: Response) {}

  async logout(req: Request,res: Response) {}
}
