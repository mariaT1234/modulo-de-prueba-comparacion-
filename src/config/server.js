const express= require('express');
const path= require('path');
const bodyParser= require('body-parser');
const multer= require('multer'); 



const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/archivos'),
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
}); 

const app = express();


app.set('port',process.env.PORT || 7000);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../app/views'));
app.use('/resources', express.static(path.join(__dirname, '../public')))

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, '../public/archivos'), 
    fileFilter: (req, file, cb)=>{
        if(!file.originalname.match(/\.(xls|xlsx)$/)){

            return cb("El archivo tiene que ser excel")
        }
        cb(undefined, true)
    }
}).single('xlsx'));     


module.exports = app;