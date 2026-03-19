/**
 *  USERS REPOSITORY
 *  @name string,
 *  @email string,
 *  @password string
 * 
 * 
 * @returns;
 */

const db = require('../database/db');


class UserRepository {

    constructor() {
        this.table = `usuario`;
        this.db = db;
    }

      /** cria novo usário na tela  de cadastro */
      async  insert(user) {

        const { name, email, password } = user;
        /**insere o usuário e retorna o ID */
      let sql = `INSERT INTO ${this.table} (name,email,password) VALUES($1,$2,$3) RETURNING user_id`;
      const result = await db.query(sql,[name, email, password]);
      const insertedId =  result.rows[0].user_id;

      const { endereco, numero, complemento,bairro, cidade, cep, estado } = user;

        await db.query(`
           INSERT INTO  endereco (usuario_id,endereco,numero,complemento,bairro,cidade,uf,cep)
           VALUES($1,$2,$3,$4,$5,$6,$7,$8)
          `, [insertedId,endereco, numero, complemento,bairro, cidade, estado, cep])

    
       return result;

      }
      /**recupera os dados do usuário para a tela de perfil */
      async findUserById(id) {

         let sql = `SELECT u.*,e.endereco, e.numero, e.complemento FROM ${this.table} u
                    JOIN endereco e ON(u.user_id = e.usuario_id)
                    WHERE u.user_id = $1`;
         return await this.db.query(sql, [id])
      }
      /** verififica se existe esse e-mail na base antes de cadastrar */ 
      async findByEmail(email) {

          const sql = `SELECT * FROM ${this.table} WHERE email = $1`;
          return await this.db.query(sql,[email]);
      }
     /** atualiza dados do usuário na tela de perfil */
      async updateUser(id, data) {

        const values = Object.values(data);
        const keys   = Object.keys(data);

          let sql = `UPDATE ${this.table} SET `;
          const fields = Object.keys(data).map((field, index) => {
               return `${field} = $${index + 1}`
           });
          
          sql += fields.join(',');
          
          sql+= ` WHERE user_id = $${keys.length + 1}`;

          console.log(sql)

          return await this.db.query(sql,[...values, id])


      }

      /**update endereço */
      async updateAddress(id, data) {
        
        const {id_usuario} = id;
        const values = Object.values(data);

        const sql = `SELECT endereco_id FROM endereco WHERE usuario_id = $1`;
        const response = await this.db.query(sql,[id_usuario]);

        if(response.rowCount > 0) {
           
              let atualizar = `UPDATE endereco SET endereco = $1, numero = $2, complemento = $3, bairro = $4, cidade = $5, estado = $6, cep = $7
                                WHERE usuario_id = $8 `;

                               return await this.db.query(atualizar,[...values, id_usuario]) 
        }

                return await this.db.query(`INSERT INTO endereco (id_usuario, endereco, numero, complemento, bairro, cidade, estado, cep)
                                             VALUES($1,$2,$3,$4,$5,$6,$7)`,[id_usuario,...values])
      }


      /** exibe os favoritados do usuário para a tela de favoritos */
      async listFavorites(user_id) {

           const sql = `SELECT CASE WHEN f.id_usuario IS NULL THEN 'N' ELSE 'S' END AS favorit,
                        r.restaurante_id, r.nome,r.endereco,r.icone, r.aberto
                        FROM restaurante r
                        JOIN favorito f ON (f.id_restaurante = r.restaurante_id AND f.id_usuario = $1)
                        ORDER BY r.nome ASC
           `;

           return await db.query(sql,[user_id])
      }


}


module.exports  = new UserRepository;