const knex = require('./knex');

function createToDo(todo){
    return knex('todo').insert(todo);
}

function getAllToDos(userId) {
    return knex('todo').select('*').where('user_id', userId);
}

module.exports = {
    createToDo,
    getAllToDos
}