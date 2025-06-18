'use strict';
const schema = process.env.NODE_ENV === 'production' ? 'public' : 'test';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: 'Participants', schema },
      {
        id: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        eventId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: 'Events',
              schema,
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: {
              tableName: 'Users',
              schema,
            },
            key: 'id',
          },
          onUpdate: 'CASCADE',
        },
      },
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ tableName: 'Participants', schema });
  },
};
