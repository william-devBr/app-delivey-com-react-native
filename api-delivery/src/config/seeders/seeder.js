/***
 *  FAKE SEEDERS
 * @returns
 */

const db = require('../../database/db')

async function Seeders() {
 try{
      /*** seeder restaurante ***/  
     await db.query(`
            INSERT INTO restaurante
             VALUES(1,1,'Burger King','contato@burgerking.com','(35)3333-3333',
             'Avenida Brasil, 100','centro','São Paulo','11000-111',
             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcOuofXSbnieuHPHFixQq7SRU7H8B2wMLkmFF7zZsielS30-13RCgFdo&s',0.00)
        `);
        console.log('seeder RESTAURANTE executado com sucesso');

      /** seeder categoria ***/
        await db.query(`
             INSERT INTO categoria
             VALUES(1,1,'LANCHES',true)
        `);
        console.log('seeder CATEGORIA executado com sucesso');
        /** seeder produto ***/
        await db.query(`
             INSERT INTO produto
             VALUES(1,1,1,'X-SALADA','Pão, hamburger 90g, alface,tomate,queijo','https://midia.gruposinos.com.br/_midias/jpg/2025/01/10/800x500/1_bk_taste-22113353.jpg',15.90,true)
        `);
        console.log('seeder PRODUTO executado com sucesso');

        

 }catch(err){

     console.log('ocorreu um erro ao executar os seeders', err.message)
 }
}

Seeders();