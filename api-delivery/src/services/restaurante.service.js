/**
 * 
 *  RESTAURANTE SERVICE
 * @readonly
 */

const RestauranteRepository = require('../repository/restaurante.repository')

class RestauranteService {

    async findAll(id_usuario) {
        try {
              const restaurantes = await RestauranteRepository.findAll(id_usuario);

              return {statusCode : 200, restaurantes : restaurantes.rows, message : 'success'}

        } catch (error) {
             return {statusCode : 500, restaurantes : [], message : 'Ocorreu um erro interno ' + error.message}
        }
    }

     /** lista os dados do restaurante e produtos passando a ID */
    async findById(restaurante) {

        try {
             const result = await RestauranteRepository.findById(restaurante);
             const dados = result.rows[0];
             /** elimina dados desnecessários da consulta */
             const{owner,email, telephone,cep,created_at,updated_at, ...rest} = dados;


              return {statusCode : 200,itens : rest, message : 'success'}
        } catch (error) {
            console.log(error.message)
             return {statusCode : 500, itens: [], message : 'Ocorreu um erro interno ' + error.message}
            
        }
     }

     /** busca feita pelo usuário */
     async findSearch(search) {

         try {

            const resultado = await RestauranteRepository.findSearch(search);
            return {statusCode : 200, resultado : resultado.rows, message : "success"}
            
         } catch (error) { 
             return {statusCode : 500, resultado :[], message : "ocorreu um erro interno " + error.message}
         }
     }
     /** favoritar restaurante */
     async addFavorite(favorite) {
          try {

              await RestauranteRepository.addFavorite(favorite);
              return {statusCode : 201, result : true, message : "success"}
            
          } catch (error) {
             return {statusCode : 500, result :false, message : "ocorreu um erro inter " + error.message}
          }
     }
     /** remove dos favoritos */
     async removeFavorite(favorite) {

        try {

              await RestauranteRepository.removeFavorite(favorite);
              return {statusCode : 201, result : true, message : "success"}
            
          } catch (error) {
             return {statusCode : 500, result :false, message : "ocorreu um erro inter " + error.message}
          }

      }

    /*** cria um novo restaurante com proprietario */
    async create(owner, restaurante) { }

    /*** atualiza os dados do restaurante pelo ID */
    async update(restaurante_id) { }

    /** inativa o restaurante passando a ID */
    async destroy(restaurante_id) { }

}

module.exports = new RestauranteService;