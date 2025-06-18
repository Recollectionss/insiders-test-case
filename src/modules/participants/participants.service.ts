import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PARTICIPANTS_REPOSITORY } from './participants.constants';
import { Participant } from './entity/participants.entity';
import { UserJwtDataDto } from '../auth/dto/user-jwt-data.dto';
import { EventService } from '../event/event.service';
import { EventDto } from '../event/dto/event.dto';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject(PARTICIPANTS_REPOSITORY)
    private readonly participantsRepository: typeof Participant,
    private readonly eventService: EventService,
  ) {}

  async register(userData: UserJwtDataDto, eventId: string) {
    await this.validateMaxParticipants(eventId);
    await this.validateRegisterToEvent(userData.sub, eventId);
    await this.participantsRepository.create({
      userId: userData.sub,
      eventId,
    });
  }

  async findAllUserRegister(userData: UserJwtDataDto): Promise<EventDto[]> {
    const data = await this.participantsRepository.findAll({
      where: { userId: userData.sub },
      attributes: [],
      include: [
        {
          model: Event,
          required: true,
        },
      ],
    });
    const events = data.map((p) => p.event);
    return events.map((event) => ({
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      location: event.location,
      maxParticipants: event.maxParticipants,
    }));
  }

  private async validateRegisterToEvent(
    userId: string,
    eventId: string,
  ): Promise<void> {
    const data = await this.participantsRepository.findOne({
      where: { userId, eventId },
    });
    if (data) throw new ConflictException('User already register');
  }

  private async validateMaxParticipants(eventId: string): Promise<void> {
    const event = await this.eventService.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    const participantsCount = await this.participantsRepository.count({
      where: { eventId },
    });

    if (participantsCount >= event.maxParticipants) {
      throw new BadRequestException('Event is already full');
    }
  }
}
