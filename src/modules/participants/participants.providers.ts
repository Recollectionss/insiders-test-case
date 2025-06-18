import { PARTICIPANTS_REPOSITORY } from './participants.constants';
import { Participant } from './entity/participants.entity';

export const ParticipantsProviders = [
  { provide: PARTICIPANTS_REPOSITORY, useValue: Participant },
];
