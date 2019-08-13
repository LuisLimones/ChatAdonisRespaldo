'use strict'

const Conversacion = use('App/Models/Conversaciones')

class ConversacionController {

    async iniciarConversacion({request,response}){
            let cantidad = request.input('usuarios').length;
            let conver_existente = await Conversacion.findOne({usuarios: {$all: request.input('usuarios'), $size: cantidad}})
            if(conver_existente){
                return response.status(400).json({error: 'Ya hay una conversación con esos usuarios!'})
            }else{
                let conver = new Conversacion();
                conver.id_chat = request.input('chat_id');
                conver.usuarios = request.input('usuarios');
                conver.mensajes = request.input('mensajes');
                await conver.save();
                return response.status(200).json(conver);
            }
    }

    async registrarMensaje({request, response}){
        try {
            await Conversacion.find({ id_chat: request.input('id_chat') })
                            .updateOne({ $push: { mensajes: request.input('mensaje')  } });
            return response.status(200).json(await Conversacion.find({ id_chat: request.input('id_chat') }));
        } catch (error) {
            return response.status(400).send({error: error})
        }
    }

    async buscarChat({request, response}){
        let cantidad = request.input('usernames').length;
        let chat = await Conversacion.findOne({usuarios: {$all: request.input('usernames'), $size:cantidad}})
        return response.status(200).json(chat);
    }
    
    async buscarGrupos({request, response}){
        let chat = await Conversacion.find({usuarios: request.input('username'), $where:'this.usuarios.length > 2'})
        return response.status(200).json(chat);
    }
}

module.exports = ConversacionController
