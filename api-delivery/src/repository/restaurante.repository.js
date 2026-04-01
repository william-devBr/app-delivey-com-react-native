/**
 * 
 *  RESTAURANTE REPOSITORY
 * 
 * @returns
 */

const db = require('../database/db');

class RestauranteRepository { 

    /** lista os restaurantes */
    /*** implantar uma forma de buscar pela região do usuário
     * verificar se é necessário habilitar o status
     */

    async findAll(id_usuario) {
        /**
         *  exibido na tela inicial 
         *  trazendo dados do restauarante e indicando se é favorito do usuário 
         * 
         * */
       try{
                   const sql = `SELECT CASE WHEN f.id_usuario IS NULL THEN 'N' ELSE 'S' END AS favorit,
                      r.restaurante_id, r.nome,r.endereco,r.icone, r.aberto,
                      COALESCE(
                        (SELECT json_agg(h)
                           FROM horario_funcionamento h
                           WHERE h.restaurante_id = r. restaurante_id
                        ),
                        '[]'
                      )as horarios
                      FROM restaurante r
                      LEFT JOIN favorito f ON (f.id_restaurante = r.restaurante_id AND f.id_usuario = $1)
                      ORDER BY r.aberto DESC`;
                      
                   return await db.query(sql,[id_usuario]);


       }catch(error) {
          console.log(error.message)
          return error;
       }
         
     }

  
    async findById(restaurante) { 

      /** 
       *  Página do restaurante exibindo os produto
       *  indicando se é favorito ou não do usuário
       * 
      */

        const {id_usuario, id_restaurante} = restaurante;

        const sql = `SELECT 
                        CASE WHEN f.id_usuario IS NULL THEN 'N' ELSE 'S' END AS favorit,
                        r.*,
                        COALESCE(
                            (SELECT json_agg(p ORDER BY p.active DESC, p.name ASC) 
                            FROM produto p 
                            WHERE p.restaurante_id = r.restaurante_id), 
                            '[]'
                        ) AS produtos,
                        COALESCE(
                            (SELECT json_agg(DISTINCT c) 
                            FROM categoria c
                            INNER JOIN produto p ON p.categoria_id = c.categoria_id
                            WHERE c.restaurante_id = r.restaurante_id),
                            '[]'
                        ) AS categorias
                    FROM restaurante r
                    LEFT JOIN favorito f ON (f.id_restaurante = r.restaurante_id AND f.id_usuario = $1)
                    WHERE r.restaurante_id = $2
                    GROUP BY r.restaurante_id, f.id_usuario`;


            return await db.query(sql,[id_usuario,id_restaurante])
    }

    /** quando o usuário efetuar a busca */
    async findSearch(search) {

      const {id_usuario, busca, id_categoria} = search;


      /** exibe a consulta da tela de busca com base na pesquisa */
        let filtro = [id_usuario];

         let sql = `
            SELECT CASE WHEN f.id_usuario IS NULL THEN 'N' ELSE 'S' END AS favorit,
              r.restaurante_id, r.nome,r.endereco,r.icone, r.aberto
              FROM restaurante r
              LEFT JOIN favorito f ON (f.id_restaurante = r.restaurante_id AND f.id_usuario = $1)
              WHERE 1=1
         `;

         if(busca) {
            sql += " AND r.nome ILIKE $2"; //incluir a categoria
            filtro.push(`%${busca}%`);
         }
         if(id_categoria) {
             sql += " AND r.id_categoria = $2";
             filtro.push(id_categoria)
         }

         sql+= "  ORDER BY r.aberto DESC";
         return await db.query(sql, filtro);
    }

    /** adiciona restaurante como favorito */
    async addFavorite(favorite) {

         const { id_usuario, id_restaurante} = favorite;

         const sql = `
                  INSERT INTO favorito (id_usuario, id_restaurante) VALUES($1,$2)
         `;
         return await db.query(sql,[id_usuario, id_restaurante]);
    }

    /** exclui restaurante dos favorits */
    async removeFavorite(favorite) {

       const { id_usuario, id_restaurante} = favorite;

         const sql = `DELETE FROM favorito WHERE id_usuario = $1 AND id_restaurante = $2`;
         return await db.query(sql,[id_usuario, id_restaurante]);
    }

    /*** cria um novo restaurante com proprietario */ 
    async create(owner, restaurante) { }

    /*** atualiza os dados do restaurante pelo ID */
    async update(restaurante_id) { }

    /** inativa o restaurante passando a ID */
    async destroy(restaurante_id) { }





    async 
}

module.exports = new RestauranteRepository;