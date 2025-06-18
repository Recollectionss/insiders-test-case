import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { JwtGuard } from '../../shared/guards/jwt/jwt.guard';
import { UserData } from '../../shared/decorators/user-data/user-data.decorator';
import { UserJwtDataDto } from '../auth/dto/user-jwt-data.dto';
import { EventDto } from '../event/dto/event.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @UseGuards(JwtGuard)
  @Post(':eventId')
  async register(
    @UserData() userData: UserJwtDataDto,
    @Param('eventId') eventId: string,
  ): Promise<void> {
    return this.participantsService.register(userData, eventId);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAllUserRegister(
    @UserData() userData: UserJwtDataDto,
  ): Promise<EventDto[]> {
    return this.participantsService.findAllUserRegister(userData);
  }
}
