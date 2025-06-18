import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty({
    example: 'a3f47d2b-8c4a-4ef2-9b3f-e8d6e3f37c2f',
    description: 'Unique identifier of the event',
  })
  id: string;

  @ApiProperty({
    example: 'Tech Conference 2025',
    description: 'Name of the event',
  })
  name: string;

  @ApiProperty({
    example: 'A conference about the latest in tech.',
    description: 'Description of the event',
  })
  description: string;

  @ApiProperty({
    example: 'Kyiv, Ukraine',
    description: 'Location where the event will take place',
  })
  location: string;

  @ApiProperty({
    example: '2025-07-15T10:00:00.000Z',
    description: 'Date and time of the event',
  })
  date: Date;

  @ApiProperty({
    example: 100,
    description: 'Maximum number of participants allowed',
  })
  maxParticipants: number;
}
