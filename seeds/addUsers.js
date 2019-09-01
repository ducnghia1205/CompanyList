exports.seed = function (knex) {
    return knex('users').del()
        .then(async function () {
            let users = [];
            for (let i = 0; i < 1000; i++) {
                users.push(
                    {
                        user_name: `name ${i}`,
                        email: `email: [${i * 100} - ${i * 1000}]`,
                        password: `password ${i}`
                    }
                )
            }

            return await knex('users').insert(users);
        });
};