'use strict'
const Helpers = use("Helpers");
class ArchivoController {
    async archivos({ request, response  }) {
      try{
        const file = request.file('file', {
          types: ['jpg','jpeg','png','gif','mp4','mp3','avi','mov','mpeg'],
          size: '1024mb'
        })
        const fileName = `${new Date().getTime()}.${file.subtype}`
       
        file.move(Helpers.publicPath('/assets/archivos/'), {
          name: `${new Date().getTime()}.${file.subtype}`
        })
        console.log('/assets/archivos/'+fileName);
        return response.status(200).json({url:'/assets/archivos/'+fileName})
      }
      catch(error)
      {
        console.log(error);
      }
    }
}

module.exports = ArchivoController
