import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PostgresModule } from '../postgres/postgres.module';
import { EventProviders } from './event.providers';

@Module({
  controllers: [EventController],
  providers: [EventService, ...EventProviders],
  imports: [PostgresModule],
})
export class EventModule {}
