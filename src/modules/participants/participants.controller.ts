import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { JwtGuard } from '../../shared/guards/jwt/jwt.guard';
import { UserData } from '../../shared/decorators/user-data/user-data.decorator';
import { UserJwtDataDto } from '../auth/dto/user-jwt-data.dto';
import { EventDto } from '../event/dto/event.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Register authenticated user to an event' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered to event',
  })
  @ApiResponse({ status: 400, description: 'Event is already full' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({ status: 409, description: 'User already registered to event' })
  @UseGuards(JwtGuard)
  @Post(':eventId')
  async register(
    @UserData() userData: UserJwtDataDto,
    @Param('eventId') eventId: string,
  ): Promise<void> {
    return this.participantsService.register(userData, eventId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all events the authenticated user is registered for',
  })
  @ApiResponse({
    status: 200,
    description: 'List of events the user is registered for',
    type: [EventDto],
  })
  @UseGuards(JwtGuard)
  @Get()
  async findAllUserRegister(
    @UserData() userData: UserJwtDataDto,
  ): Promise<EventDto[]> {
    return this.participantsService.findAllUserRegister(userData);
  }
}
