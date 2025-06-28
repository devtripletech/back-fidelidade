import { Request, Response } from "express";
import { BuscaClienteService } from "../../services/buscacliente/BuscaClienteService";


interface dadosProps{

    cpf: string
    nome : string
    celular : string
    id_user : number
}
class BuscaClienteController {


    async buscaCliente(req :Request, res : Response){

        const {nome, cpf, celular, id_user} : dadosProps = req.body

        console.log("controller" + id_user)
        const buscaClienteService = new BuscaClienteService()

        try{

            const resultado = await buscaClienteService.BuscaCliente({nome, cpf, celular, id_user})
        
            res.json({busca : resultado , error : false})
            res.status(200)
          
        }catch(error)
        {
            console.log(error)
            res.status(400)
            res.json({busca : "" , error : true})
        }


    }


    async buscaClienteapi(req :Request, res : Response){

        //const {nome, cpf, celular} : dadosProps = req.body
        const nome = req.query.nome
        const cpf = req.query.cpf
        const celular = req.query.celular
     
        console.log('cpf controllerr >>> ')
        console.log(cpf)

        const buscaClienteService = new BuscaClienteService()

        try{

            const resultado = await buscaClienteService.BuscaClienteApi({nome, cpf, celular})
        
            if(resultado == undefined){
                res.json({ error : "Não foi encontrado esse dado em nossa base"})
                res.status(200)
            }else{
                res.json({busca : resultado , error : false})
                res.status(200)
            }
       
          
        }catch(error)
        {
            console.log(error)
            res.status(400)
            res.json({busca : "" , error : true})
        }


    }


}

export { BuscaClienteController}