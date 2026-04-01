const db = require('../database/db');


class AuthRepository {

    constructor() {
        this.table = 'usuario';
    }

    async login(email) {

        const sql = `SELECT * FROM ${this.table} WHERE email = $1`;
        return await db.query(sql,[email]);
    }

}

module.exports = new AuthRepository;
