exports.up = async function (knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id')
      .notNullable()
      .primary()

    table.string('user_name')
      .notNullable()

    table.string('email')
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
