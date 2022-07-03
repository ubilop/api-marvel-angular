const express = require('express');
const app = express();

/*=============================================
IMPORTAMOS EL CONTROLADOR
=============================================*/

const Users = require('../controllers/users.controller');

/*=============================================
CREAMOS LAS RUTAS HTTP
=============================================*/

app.get('/view-users',  Users.viewUsers);

app.post('/create-user',  Users.createUser);

app.post('/login-user', Users.loginUser);

app.put('/edit-user/:id',  Users.editUser);

/*=============================================
EXPORTAMOS LA RUTA
=============================================*/

module.exports = app;
