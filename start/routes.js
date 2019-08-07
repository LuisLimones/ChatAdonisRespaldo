'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


// Postgres | Usuarios
Route.post('/registrar-usuario', 'UsuarioController.registrarUsuario')
Route.get('/obtener-usuarios', 'UsuarioController.mostrarUsuarios')
Route.post('/buscar-usuario', 'UsuarioController.buscarUsuario')

// Postgres | Chat
Route.post('/reg-chat', 'ChatController.registrar')

// Mongo | Conversaciones
Route.post('/iniciar-conversacion', 'ConversacionController.iniciarConversacion')
Route.post('/login','UsuarioController.login')
Route.post('/obtener-conversacion', 'ConversacionController.buscarChat')
Route.post('/obtener-grupos', 'ConversacionController.buscarGrupos')
Route.post('/enviar-mensaje', 'ConversacionController.registrarMensaje')

// Mongo | Prueba
Route.post('/pruebaMongo', 'PruebaController.pruebaMongo')
Route.get('/pruebaPg', 'PruebaController.pruebaPg')
Route.post('/prueba-conver','ChatController.prueba')

//Archivos
Route.post('/archivos','ArchivoController.archivos');