'use strict'

const Usuario = use('App/Models/User')
var Hash = use('Hash')
var jwt = require('jsonwebtoken')

class UsuarioController {
    async mostrarUsuarios({ request, response }){
        return response.status(200).json(await Usuario.query().orderBy('id').fetch());
    }

    async buscarUsuario({request, response}){
        const usuario = await Usuario.findBy('id', request.input('id'));

        return response.status(200).json(usuario);
    }

    async registrarUsuario({request, response}){
        const usuario_existente = await Usuario.findBy('username',request.input('username'));
        const correo_existente = await Usuario.findBy('email',request.input('email'));
        if(usuario_existente || correo_existente){
            return response.status(400).json({error: 'El usuario y/o correo ya existe!'})
        }
        else{
            const usuario = new Usuario();
            usuario.username = request.input('username');
            usuario.email = request.input('email')
            usuario.password = request.input('password');
            await usuario.save();
            return response.status(200).json(await Usuario.query().orderBy('id').fetch());
        }
    }

    async login ({request, response, auth}){
        let usuario = new Usuario();
        usuario = request.all();
        let usuariobd =  await Usuario.findBy('username',usuario.username)
        if(usuariobd !== null)
        {
            const verificar = await Hash.verify(usuario.password,usuariobd.password)
            if (verificar){
                return response.status(200).json({token: jwt.sign({usuariobd},'rockero'),id:usuariobd.id,username:usuariobd.username})
            }
            else{
                return response.status(403).send({Error: 'Contraseña Incorrecta'})
            } 
        }
        else{
            return response.status(404).send({Error: 'Usuario no encontrado'})
        }
    }
}

module.exports = UsuarioController
