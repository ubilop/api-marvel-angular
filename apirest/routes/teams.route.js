const express = require('express');
const app = express();

/*=============================================
IMPORTAMOS EL CONTROLADOR
=============================================*/

const Teams = require('../controllers/teams.controller');

/*=============================================
CREAMOS LAS RUTAS HTTP
=============================================*/

app.post('/get-teams',  Teams.viewTeams);
app.post('/create-teams',  Teams.createTeams);
app.delete('/delete-teams/:id',  Teams.deleteTeams);


/*=============================================
EXPORTAMOS LA RUTA
=============================================*/

module.exports = app;
