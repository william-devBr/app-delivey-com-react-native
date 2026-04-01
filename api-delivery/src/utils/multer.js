
const multer = require('multer');
const path = require('path');

module.exports = (multer({
  
   storage:multer.diskStorage({

 destination: (req, file, cb) => {
    cb(null, './uploads/'); // Pasta específica para imagens
  },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'file-' + uniqueSuffix + ext); // Ex: "file-1234567890.jpg"
  }
     
   }),

   fileFilter: (_, file,cb)=> {
      const extensions = ['image/png','image/jpg','image/jpeg'].find(extension => extension === file.mimetype);
      if(extensions) {

        cb(null, true); // Aceita o arquivo
      }
      else {
         cb(new Error("Arquivo inválido"), false); // Rejeita o arquivo
      }
   }
}))
