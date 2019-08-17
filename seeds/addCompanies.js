exports.seed = function (knex) {
  return knex('companies').del()
    .then(async function () {
      let companies = [];
      for (let i = 0; i < 1000; i++) {
        companies.push(
          {
            name: `name ${i}`,
            employee_count: `employee count: [${i * 100} - ${i * 1000}]`,
            description: `description ${i}`,
            country_code: `country code ${i}`,
            address: `address ${i}`,
            placeholder_url: `url ${i}`,
            video_url: `video url ${i}`,
            founded_at: `founded at ${i}`
          }
        )
      }

      return await knex('companies').insert(companies);
    });
};
