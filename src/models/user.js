const db = require('../db');

class User {
    async findByEmail(...params) {

        return (await db.query('SELECT * FROM users WHERE email = $1', ...params)).rows
    }

    async createUser(...params) {
        await db.query('INSERT INTO public.users (username,email,hash) VALUES ($1, $2, $3);', ...params)
    }
}


module.exports = new User();