const app= require('./config/server'); 

require('./app/routes/routes.js')(app); 

app.listen(app.get('port'), () => {
   console.log('servidor en el puerto :', app.get('port'));  
})

