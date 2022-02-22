const server= require('../../config/server'); 

module.exports= app =>{
    
    app.get('/', (req, res) =>{
        res.render('../views/init_page.ejs')
    })

    app.get('/comparacion', (req, res)=>{
        res.render('../views/comparacion.ejs')
    })

    app.get('/registro', (req, res)=>{
        res.render('../views/registro.ejs')
    })

    app.post('/subir', (req, res)=> {
        console.log(req.file);
        res.redirect('/registro')

        /* if(){

        }else  */
    })

    
}