const knex = require('./knex');

function createUser(user){
    return knex('user').insert(user);
}

function getOneUser(user){
    return knex("user").select('*').where('email', user.email);
}

module.exports = {
    createUser,
    getOneUser
}