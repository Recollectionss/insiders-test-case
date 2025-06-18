import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'Get all events ordered by upcoming first' })
  @ApiResponse({ status: 200, type: EventDto, description: 'List of events' })
  @Get()
  findAll(): Promise<EventDto[]> {
    return this.eventService.findAll();
  }

  @ApiOperation({ summary: 'Get event by UUID' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the event',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    type: EventDto,
    description: 'Event data returned',
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID format' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventDto> {
    return this.eventService.findOne(id);
  }
}
