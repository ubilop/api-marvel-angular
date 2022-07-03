/*=============================================
IMPORTAMOS EL MODELO
=============================================*/

const Teams = require('../models/teams.model');


/*=============================================
FUNCIÓN GET
=============================================*/

let viewTeams = (req, res)=>{

  var body = req.body;

  console.log(body);

	//https://mongoosejs.com/docs/api.html#model_Model.find

	Teams.find({user: body.user})
	.exec((err, data)=>{

		if(err){

			return res.json({

				status:500,
				mensaje: "Error en la petición"

			})
		}

		//Contar la cantidad de registros
		Teams.countDocuments({}, (err, total)=>{

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

let createTeams = (req, res)=>{

  var body = req.body;

  //Verificar Cantidad de Registros

  var characters;

  Teams.find({user: body.user})
	.exec((err, data)=>{

		if(err){

			return res.json({

				status:500,
				mensaje: "Error en la petición"

			})
		}

		//Contar la cantidad de registros
		Teams.countDocuments({user: body.user}, (err, total)=>{

			if(err){

				return res.json({

					status:500,
					mensaje: "Error en la petición"

				})
			}

			characters = total;


      if(total >= 6){


        return res.json({

          status:400,
          mensaje: 'El equipo no puede tener más de 6 personajes, elimine alguno para poder agregar'

        })


      }else{

        let teams = new Teams({

          user:body.user,
          ruta:body.ruta,
          name:body.name

        })

        teams.save((err, data)=>{

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
            mensaje:"El Personaje ha sido agregado a tu Equipo con éxito"

          })

        })


      }

		})
  })

}


/*=============================================
FUNCIÓN DELETE
=============================================*/

let deleteTeams = (req, res)=>{


	let id = req.params.id;

	//https://mongoosejs.com/docs/api.html#model_Model.findById

	Teams.findById(id, ( err, data) =>{



		if(err){

			return res.json({

				status: 500,
				mensaje:"Error en el servidor",
				err

			})
		}


		if(!data){

			return res.json({

				status: 400,
				mensaje:"El Registro no existe en la Base de datos"

			})

		}


		// Borramos registro en MongoDB
		//https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove

		Teams.findByIdAndRemove(id, (err, data) =>{

			if(err){

				return res.json({

					status: 500,
					mensaje:"Error al borrar el personaje",
					err

				})
			}

			res.json({
				status:200,
				mensaje: "El personaje se ha eliminado correctamente de su equipo"

			})

		})

	})

}



/*=============================================
EXPORT FUNCTIONS CONTROLLER
=============================================*/


module.exports = {

	viewTeams,
  createTeams,
  deleteTeams

}
