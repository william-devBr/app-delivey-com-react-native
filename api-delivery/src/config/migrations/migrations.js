/**
 * MIGRATIONS
 * @returns migrations
 * 
 **/
const db = require('../../database/db');

async function runMigrations() {
  try {

    /** USUARIO */
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        user_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(60) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabela USUARIO criada com sucesso!');


      /**CATEGORIAS RESTAURANTES */
     await db.query(`
       CREATE TABLE IF NOT EXISTS categoria_restaurantes(
           id_categoria SERIAL PRIMARY KEY,
           categoria VARCHAR(30) NOT NULL,
           icone VARCHAR(255) NOT NULL,
           ordem INT NOT NULL
       )
      `);
      console.log('categoria CATEGORIA RESTAURANTES criado com sucesso')

    /** RESTAURANTE taxID=CNPJ/CPF */
    await db.query(`
      CREATE TABLE IF NOT EXISTS restaurante (
        restaurante_id SERIAL PRIMARY KEY,
        proprietario INT NOT NULL,
        nome VARCHAR(100) NOT NULL ,
        taxId VARCHAR(20) NOT NULL,
        descricao VARCHAR (200) NULL,
        img_capa TEXT NULL,
        img_logo TEXT NULL,
        id_categoria INT NOT NULL,
        vl_taxa_entrega NUMERIC(10,2) NOT NULL DEFAULT 0.00, 
        pedido_minimo NUMERI(10,2)  NULL DEFAULT 0.00,
        endereco VARCHAR(100) NOT NULL,
        complemento VARCHAR(50) NULL,
        bairro  VARCHAR(50) NOT NULL,
        cidade  VARCHAR(100) NOT NULL,
        estado  VARCHAR(45) NOT NULL,
        cep     VARCHAR(15) NOT NULL,
        aberto BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

          FOREIGN KEY (proprietario)
            REFERENCES usuario(user_id),

          FOREIGN KEY(id_categoria)
             REFERENCES categoria_restaurantes(id_categoria)
      );
    `);
    console.log('Tabela RESTAURANTE criada com sucesso!');

    /**HORÁRIO DE FUNCIONAMENTO */
    await db.query(`
         CREATE TABLE IF NOT EXISTS horarios_funcionamento (
               restaurante_id INT,
               dia_semana INT DEFAULT 1,
               abertura TIME,
               fechamento TIME,

               FOREIGN KEY(restaurante_id) REFERENCES restaurante(restaurante_id)
         );
      `);
      console.log('tabela HORÁRIO de FUNCIONAMENTO criado com sucesso');

      /** FORMAS DE PAGAMENTO */
      await db.query(`
          CREATE TABLE IF NOT EXISTS forma_pagamento (
            id SERIAL PRIMARY KEY,
            restaurante_id INT NOT NULL,
            debito BOOLEAN DEFAULT true,
            credito BOOLEAN DEFAULT true,
            dinheiro BOOLEAN DEFAULT true,
            pix BOOLEAN DEFAULT true,

            FOREIGN KEY(restaurante_id) REFERENCES restaurante(restaurante_id)
          );
        `);
      console.log('tabela FORMA DE PAGAMENTO criada com sucesso')
    
      /** ENDERECO */
    await db.query(`
      CREATE TABLE IF NOT EXISTS endereco (
        endereco_id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL,
        endereco VARCHAR(100) NOT NULL,
        numero VARCHAR(10) NOT NULL,
        complemento VARCHAR(50) NULL,
        bairro VARCHAR(60),
        cidade VARCHAR(60) NOT NULL,
        estado VARCHAR(30) NOT NULL,
        cep VARCHAR(10),

        CONSTRAINT fk_endereco_usuario
          FOREIGN KEY (usuario_id)
          REFERENCES usuario(user_id)
          ON DELETE CASCADE
      );
    `);
    console.log('Tabela ENDERECO criada com sucesso!');


    /** CATEGORIA */
    await db.query(`
      CREATE TABLE IF NOT EXISTS categoria (
        categoria_id SERIAL PRIMARY KEY,
        restaurante_id INT NOT NULL,
        nome VARCHAR(50) NOT NULL,
        ordem INT(1) NULL,
       
          FOREIGN KEY (restaurante_id)
          REFERENCES restaurante(restaurante_id)
      );
    `);
    console.log('Tabela CATEGORIA criada com sucesso!');

   
    /** PRODUTO */
    await db.query(`
      CREATE TABLE IF NOT EXISTS produto (
        produto_id SERIAL PRIMARY KEY,
        restaurante_id INT NOT NULL,
        categoria_id INT NOT NULL,
        name VARCHAR(50) NOT NULL,
        description VARCHAR(200),
        imgUrl VARCHAR(255) NULL,
        price NUMERIC(10,2) NOT NULL,
        destacado BOOLEAN DEFAULT false,
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

       
          FOREIGN KEY (restaurante_id)
          REFERENCES restaurante(restaurante_id),
        
          FOREIGN KEY (categoria_id)
          REFERENCES categoria(categoria_id)
    
      );
    `);
    console.log('Tabela PRODUTO criada com sucesso!');

     /** PEDIDO */
   await db.query(`
     CREATE TABLE IF NOT EXISTS pedido(
       id SERIAL PRIMARY KEY,
       id_usuario INT NOT NULL,
       id_restaurante INT NOT NULL,
       numero_pedido VARCHAR NOT NULL,
       valor_pedido NUMERIC(10,2),
       status_pedido INT DEFAULT 0,
       vl_taxa_entrega NUMERIC(10,2) DEFAULT 0,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


         CONSTRAINT fk_id_usuario
         FOREIGN KEY (id_usuario)
           REFERENCES usuario(user_id)
           ON DELETE CASCADE,

          
          CONSTRAINT fk_id_restaurante
          FOREIGN KEY (id_restaurante)
          REFERENCES restaurante(restaurante_id)
          ON DELETE CASCADE

     );
    
  `);
    console.log('tabela PEDIDO criadaz com sucesso');

    /*** ITENS DO PEDIDO  */
    await db.query(`
          CREATE TABLE IF NOT EXISTS itens(
             id_pedido INT NOT NULL,
             id_produto INT NOT NULL,
             quantidade INT NOT NULL,
             observacao VARCHAR(200) DEFAULT NULL,
             sub_total NUMERIC(10,2) NOT NULL,

             CONSTRAINT fk_id_pedido 
                FOREIGN KEY(id_pedido) REFERENCES pedido(id)
                ON DELETE CASCADE,

             CONSTRAINT fk_id_produto
                FOREIGN KEY(id_produto) REFERENCES produto(produto_id)
                ON DELETE CASCADE
             
          );
    `);
    console.log("tabela ITENS criada com sucesso");

    /**FAVORITO */
    await db.query(`
        CREATE TABLE IF NOT EXISTS favorito(
            id_usuario INT NOT NULL,
            id_restaurante INT NOT NULL,

            FOREIGN KEY(id_usuario) REFERENCES usuario(user_id),

            FOREIGN KEY(id_restaurante) REFERENCES restaurante(restaurante_id),

            UNIQUE(id_usuario,id_restaurante)

        );
    `);
    console.log('tabela FAVORITO criada com sucesso...')

/***** ************************************************************* */
    console.log('\n✅ Todas as migrations executadas com sucesso!');

  } catch (error) {
/*********ERROR**********************************************************/
    console.error('❌ Erro ao executar migrations:', error.message);
  }




}

runMigrations();