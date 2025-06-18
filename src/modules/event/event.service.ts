import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY } from './event.constants';
import { Event } from './entities/event.entity';
import { EventDto } from './dto/event.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY) private readonly eventRepository: typeof Event,
  ) {}

  async findAll(): Promise<Event[]> {
    const now = new Date();

    return await this.eventRepository.findAll({
      order: [
        [Sequelize.literal(`"date" > '${now.toISOString()}'`), 'DESC'],
        ['date', 'ASC'],
      ],
    });
  }

  async findOne(id: string): Promise<EventDto> {
    return (await this.eventRepository.findByPk(id)).dataValues;
  }
}
