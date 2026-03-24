/**
 * TEST DB PRISTMA
 * @readonly
 */

const db = require('./database/db.js');

db.connect()
.then(()=> {
  console.log('conectado com sucesse')
})
.catch((err)=> {
  console.log('ocorreu um erro ' + err.message)
})
