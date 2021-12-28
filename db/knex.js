const knex = require("knex");

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "tododb.sqlite3"
    }
})

module.exports = connectedKnex;