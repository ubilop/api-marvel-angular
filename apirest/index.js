require('./config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');

/*=============================================
CREAMOS UNA VARIABLE PARA TENER TODAS LAS FUNCIONALIDADES DE EXPRESS
=============================================*/

const app = express();

/*=============================================
MIDDLEWARE PARA BODY PARSER
=============================================*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

// parse application/json
app.use(bodyParser.json({limit: '10mb', extended: true}));

/*=============================================
 CORS
=============================================*/

app.use(cors());



/*=============================================
ROUTES
=============================================*/

app.use( require('./routes/users.route'));


/*=============================================
CONEX DB
=============================================*/

mongoose.connect('mongodb://localhost:27017/marvel', {useNewUrlParser: true,useUnifiedTopology: true}, (err, res)=>{

	if(err) throw err;

	console.log("Conectado a la base de datos")

});

/*=============================================
SALIDA PUERTO HTTP
=============================================*/
app.listen(process.env.PORT, ()=>{

	console.log(`Habilitado el puerto ${process.env.PORT}`)
})
