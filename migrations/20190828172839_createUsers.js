const bcrypt = require('bcrypt-nodejs');

exports.up = async function (knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id')
      .notNullable()
      .primary()

    table.string('user_name')
      .unique()
      .notNullable()

    table.string('email')
      .unique()
      .notNullable()

    table.string('password')
      .notNullable()

    table.timestamp('deleted_at')
      .nullable()

    table.timestamps(true, true)
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTable('users');
};

exports.generatePassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

exports.comparePassword = function (password, databasePassword) {
  return bcrypt.compareSync(password, databasePassword);
};
