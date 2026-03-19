
/**
 *  CATEGORIA REPOSITORY
 * 
 * @readonly
 */

const db = require('../database/db');

class CategoriaRepository { 
     
     async findAll() {
          return await db.query("SELECT * FROM categoria_restaurantes",[]);
     }
     /**adiociona uma nova categoria com o ID do restaurante */
    async create (params) {
         
         const sql = `INSERT INTO categoria (restaurante_id,nome) VALUES($1,$2)`;
         return await db.query(sql, params);
    }

    async update(params) { }

    async remove(params) {}
}

module.exports = new CategoriaRepository;