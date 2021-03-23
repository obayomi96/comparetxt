'use strict';

import bcrypt from 'bcrypt';

const saltRounds = 10;

const password = bcrypt.hashSync('password1234', saltRounds);


module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Assistants', [
      {
        email: 'oyinder@gmail.com',
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'obayomimartins96@gmail.com',
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.dropAllTables(),
};
