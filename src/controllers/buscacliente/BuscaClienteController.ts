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


}

export { BuscaClienteController}