import { Controller, Get, Body, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../../shared/guards/jwt/jwt.guard';
import { UserData } from '../../shared/decorators/user-data/user-data.decorator';
import { UserJwtDataDto } from '../auth/dto/user-jwt-data.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  findOne(@UserData() userData: UserJwtDataDto) {
    return this.userService.findById(userData);
  }

  @UseGuards(JwtGuard)
  update(
    @UserData() userData: UserJwtDataDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userData, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete()
  remove(@UserData() userData: UserJwtDataDto) {
    return this.userService.remove(userData);
  }
}
