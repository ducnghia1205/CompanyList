exports.up = async function (knex) {
  await knex.schema.createTable('companies', table => {
    table.increments('id')
      .notNullable()
      .primary()

    table.string('name')
      .notNullable()

    table.string('employee_count')
      .nullable()

    table.string('description')
      .nullable()

    table.string('country_code')
      .notNullable()

    table.string('address')
      .notNullable()

    table.string('placeholder_url')
      .notNullable()

    table.string('video_url')
      .nullable()

    table.string('founded_at')
      .nullable()

    table.timestamp('deleted_at')
      .nullable()

    table.timestamps(true, true)
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTable('companies');
};
