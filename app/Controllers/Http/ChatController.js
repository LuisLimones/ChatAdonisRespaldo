'use strict'

const Chat = use('App/Models/Chat')

class ChatController {
   
    async registrar({response}){
        let chat = new Chat();
        chat.created_at = Date.now();
        await chat.save();
        return response.status(200).json(chat);
    }
}

module.exports = ChatController
