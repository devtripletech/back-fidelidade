import {Request, response, Response} from 'express'
import { EnviaTxt } from '../../services/whatsapp/conversa'

class Whats {


    async envia (req : Request , res : Response){

        const { message, to } = req.body

        const enviaTxt= new EnviaTxt();
        const resultado = await enviaTxt.sendMessageWhats(to, message)
        res.status(200)
        res.json({mensagem : "mensagem enviada com sucesso !!"})
    }

}

export {Whats}