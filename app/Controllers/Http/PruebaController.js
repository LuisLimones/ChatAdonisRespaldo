'use strict'
const modelo = use('App/Models/pruebasMongo')
const Database=use('Database')

class PruebaController {
    async pruebaMongo({request,response}){
        try {
            
            let registro = new modelo()
            registro.title=request.input('title')
            registro.author=request.input('author')
            registro.body=request.input('body')
            await registro.save()
            return response.status(200).json({mensaje: 'si se armo'})
        } catch (error) {
            return response.status(400).send({error: error})
        }
    }

    async pruebaPg({response}){
        const pg = Database.connection('pg')
        const result = await pg.select('*').table('chats')
        return response.status(200).json(result)
    }
   
}

module.exports = PruebaController
