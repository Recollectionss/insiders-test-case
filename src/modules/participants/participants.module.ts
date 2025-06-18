import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantsProviders } from './participants.providers';
import { EventModule } from '../event/event.module';

@Module({
  controllers: [ParticipantsController],
  providers: [ParticipantsService, ...ParticipantsProviders],
  imports: [EventModule],
})
export class ParticipantsModule {}
