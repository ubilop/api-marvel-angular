/*=============================================
ESQUEMA PARA EL MODELO CONECTOR A MONGODB
=============================================*/
const mongoose = require('mongoose');

//Requerimos el módulo para validaciones únicas
//const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usersSchema = new Schema({
	user: {
		type: String,
		required: [true, "El usuario es obligatorio"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatoria"]
	},
	description: {
		type: String,
	}
})


/*=============================================
Evitar devolver en la DATA el campo Password
=============================================*/

usersSchema.methods.toJSON = function(){

	let user = this;
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;

}

/*=============================================
Devolver mensaje personalizado para validaciones únicas
=============================================*/

//usersSchema.plugin(uniqueValidator, {message: 'El {PATH} ya está registrado en la Base de datos' })

/*=============================================
EXPORTAMOS EL MODELO
=============================================*/

module.exports = mongoose.model("users", usersSchema);

