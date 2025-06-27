import { Request, Response } from "express";
import { ClienteService } from "../../services/clientes/ClientesService";


interface ClienteEmpresaProps{
    id_empresa : number
    id_campanha? : number
    name? : string
}

export interface mensagemProps{
    messagem : string
    number : string
}
class ClientesContrller{


    async contagemClienteEmpresa(req: Request, res : Response){
        const clienteService = new ClienteService()
        const id_empresa = req.params.id_empresa
        
        try {

            const resultado = await clienteService.QtdeClienteEmpresa({id_empresa})
            if(resultado.status == true){
                res.status(200)
                res.json(resultado.resultado)
            }else{
                res.status(200)
                res.json({status : false})
            }
            
        } 
        catch (error) {
            res.status(400)
            res.json({status : false})
        }
    
    }



    async SendMensagemSMS(req : Request, res : Response){
        const clienteService = new ClienteService()
      


    }

    async BuscaClienteBonus(req : Request, res : Response){
        
        const id_empresa = req.params.id_empresa

        const clienteService = new ClienteService()

        const resultado  = await clienteService.buscaClienteBonus({id_empresa})

        if(resultado.status == true){

           res.status(200)
           res.json({status : true, resultado : resultado.resultado})

        }else{
            res.status(400)
           res.json({status : false})
        }

    }

    async ClientesList(req : Request, res : Response){

        const id_empresa = req.query.id_empresa
        const name = req.query.name
        const id_campanha = req.query.id_campanha
        const datainicio = req.query.datainicio
        const datafim = req.query.datafim

        
        const clienteService = new ClienteService()

        const resultado = await clienteService.ListaClientesEmpresa({id_empresa, id_campanha, name, datainicio, datafim})

        if(resultado.status == true){
      
            res.status(200)
            res.json({status: true, resultado : resultado.resultado})
        }
        else{
            res.status(400)
            res.json({status: false})
        }

    }


}

export  {ClientesContrller}