/**
 * 
 *  PRODUTO REPOSITORY
 * @readonly
 * 
 
 */

const db = require('../database/db')

class ProdutoRepository {

    /** lista todos os produtos pelo ID do restaurante */
    async findAll(restaurante_id) {

          const sql = `SELECT * FROM produto 
                       WHERE restaurante_id = $1
                       ORDER BY created_at DESC
                       LIMIT 200
                       `;

         return await db.query(sql, [restaurante_id]);
     }

    /** lista os detalhes do produto pelo ID produto e restaurante */
     async findById(produto_id, restaurante_id) { }
     
      /** cria um novo produto passando o ID do restaurante e ID categoria */
     async create(restaurante_id, categorua_id,  produto) { }

     /*** atualiza os dados do produto passando ID produto e ID restaurante */
     async update(idProduto, restaurante_id,  detalhes) { }

    /** atualiza o status do produto tipo boolean */
     async destroy(produto_id, status)  { }
}

module.exports = new ProdutoRepository;