import { EVENT_REPOSITORY } from './event.constants';
import { Event } from './entities/event.entity';

export const EventProviders = [{ provide: EVENT_REPOSITORY, useValue: Event }];
