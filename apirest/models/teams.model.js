/*=============================================
SCHEMA MONGODB
=============================================*/
const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let teamsSchema = new Schema({
	user: {
		type: String,
		required: [true, "El ID usuario es obligatorio"]
	},
	ruta: {
		type: String
	},
	name: {
		type: String
	}
})


/*=============================================
EXPORTS MODELS
=============================================*/

module.exports = mongoose.model("teams", teamsSchema);
