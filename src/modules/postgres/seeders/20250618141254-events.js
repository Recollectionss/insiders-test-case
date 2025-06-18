'use strict';
const schema = process.env.NODE_ENV === 'production' ? 'public' : 'test';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { tableName: 'Events', schema },
      [
        {
          id: uuidv4(),
          name: 'Tech Conference 2025',
          description: 'Annual technology conference with talks and workshops.',
          date: new Date('2025-09-15T10:00:00Z'),
          location: 'Kyiv, Ukraine',
          maxParticipants: 1,
        },
        {
          id: uuidv4(),
          name: 'Music Festival Summer',
          description: '3-day open-air music festival with various artists.',
          date: new Date('2025-07-01T14:00:00Z'),
          location: 'Lviv, Ukraine',
          maxParticipants: 5000,
        },
        {
          id: uuidv4(),
          name: 'Art Exhibition Opening',
          description: 'Exhibition opening of modern art pieces.',
          date: new Date('2025-08-10T18:30:00Z'),
          location: 'Odesa, Ukraine',
          maxParticipants: 200,
        },
        {
          id: uuidv4(),
          name: 'Startup Pitch Night',
          description: 'Event for startups to pitch ideas to investors.',
          date: new Date('2025-06-25T19:00:00Z'),
          location: 'Kharkiv, Ukraine',
          maxParticipants: 100,
        },
        {
          id: uuidv4(),
          name: 'Charity Run',
          description: '5km run for charity supporting local schools.',
          date: new Date('2025-10-05T09:00:00Z'),
          location: 'Dnipro, Ukraine',
          maxParticipants: 300,
        },
      ],
      {},
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
