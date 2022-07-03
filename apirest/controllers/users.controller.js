/*=============================================
IMPORTAMOS EL MODELO
=============================================*/

const Users = require('../models/users.model');


const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

/*=============================================
FUNCIÓN GET
=============================================*/

let viewUsers = (req, res)=>{

	//https://mongoosejs.com/docs/api.html#model_Model.find

	Users.find({})
	.exec((err, data)=>{

		if(err){

			return res.json({

				status:500,
				mensaje: "Error en la petición"

			})
		}

		//Contar la cantidad de registros
		Users.countDocuments({}, (err, total)=>{

			if(err){

				return res.json({

					status:500,
					mensaje: "Error en la petición"

				})
			}

			res.json({
				status: 200,
				total,
				data
			})

		})

	})

}

/*=============================================
FUNCIÓN POST
=============================================*/

let createUser = (req, res)=>{


	let body = req.body;

	let users = new Users({

		user:body.user,
		password:bcrypt.hashSync(body.password,10),
		description:body.description

	})

	users.save((err, data)=>{

		if(err){

			return res.json({

				status:400,
				mensaje: err.message,
				err

			})

		}

		res.json({

			status:200,
			data,
			mensaje:"El usuario ha sido creado con éxito"

		})

	})

}




/*=============================================
FUNCIÓN LOGIN
=============================================*/

let loginUser =(req, res)=>{

	//Obtenemos el cuerpo del formulario del formulario

	let body = req.body;

	//Recorremos la base de datos en búsqueda de coincidencia con el usuario

	Users.findOne({user:body.user}, (err, data)=>{

		//Validamos que no ocurra error en el proceso

		if(err){

			return res.json({

				status: 500,
				mensaje:"Error en el servidor",
				err

			})
		}


		//Validamos que el Usuario exista

		if(!data){

			return res.json({

				status: 400,
				mensaje:"El usuario es incorrecto"

			})

		}

		//Validamos que la contraseña sea correcta

		if( !bcrypt.compareSync(body.password, data.password)){

			return res.json({

				status: 400,
				mensaje:"La contraseña es incorrecta"

			})

		}

		//Generamos el token de autorizacíón

		let token  = jwt.sign({

			data

		}, process.env.SECRET, { expiresIn: process.env.CADUCIDAD })

		res.json({

			status:200,
      data,
			token
		})

	})

}


/*=============================================
FUNCIÓN PUT
=============================================*/

let editUser = (req, res)=>{



	let id = req.params.id;

	let body = req.body;


	//https://mongoosejs.com/docs/api.html#model_Model.findById

	Users.findById(id, ( err, data) =>{

		//Validamos que no ocurra error en el proceso

		if(err){

			return res.json({

				status: 500,
				mensaje:"Error en el servidor",
				err

			})
		}

		//Validamos que el Administrador exista

		if(!data){

			return res.json({

				status: 400,
				mensaje:"El usuario no existe en la Base de datos"

			})

		}

		let pass = data.password;

		/*=============================================
		2. VALIDAMOS QUE HAYA CAMBIO DE CONTRASEÑA
		=============================================*/

		let validarCambioPassword = (body, pass)=>{

			return new Promise((resolve, reject)=>{

				if(body.password == undefined){

					resolve(pass);

				}else{

					pass = bcrypt.hashSync(body.password,10);

					resolve(pass);

				}

			})

		}

		/*=============================================
		3. ACTUALIZAMOS LOS REGISTROS
		=============================================*/

		let cambiarRegistrosBD = (id, body, pass)=>{

			return new Promise((resolve, reject)=>{

				let dataUser = {

					user: body.user,
					password: pass,
          description: body.description


				}

				//Actualizamos en MongoDB
				//https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
				Users.findByIdAndUpdate(id, dataUser, {new:true, runValidators:true}, ( err, data) =>{

					if(err){

						let respuesta = {

							res: res,
							error: error
						}

						reject(respuesta);

					}

					let respuesta = {

						res: res,
						data: data
					}

					resolve(respuesta);

				})

			})

		}

		/*=============================================
		SINCRONIZAMOS LAS PROMESAS
		=============================================*/

		validarCambioPassword(body, pass).then(pass => {

			cambiarRegistrosBD(id, body, pass).then(respuesta =>{

				respuesta["res"].json({

					status:200,
					data: respuesta["data"],
					mensaje:"El administrador ha sido actualizado con éxito"

				})

			}).catch( respuesta => {

				respuesta["res"].json({

					status:400,
					err: respuesta["err"],
					mensaje:"Error al editar el administrador"

				})


			})

		}).catch(respuesta => {

			respuesta["res"].json({

				status:400,
				mensaje:respuesta["mensaje"]

			})

		})

	})

}

/*=============================================
EXPORTAMOS LAS FUNCIONES DEL CONTROLADOR
=============================================*/


module.exports = {

	viewUsers,
  createUser,
  loginUser,
  editUser


}
