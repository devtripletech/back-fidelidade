import { Request, Response } from "express";
import { CarimboService, EmpresaProps } from "../../services/carimbo/CarimboService";
import { ClienteService } from "../../services/clientes/ClientesService";

class CarimboController{


    async BuscaCarimboClienteMensalController (req: Request, res: Response)

    {

        
        const id_empresa = req.params.id_empresa

        console.log("id_empresa >> " +id_empresa)
        try{
                const carimboService = new CarimboService()
                const resultado = await carimboService.BuscaCarimboClienteGeral({id_empresa} ) 

                res.status(200)
                res.json({status: true, resultado: resultado.resultado})

        }catch(errro){

                res.status(400)
                res.json({status: false, mensagem : "Carimbo não adicionado"})
        }


    }

    async inserCarimbo(req : Request, res : Response){

        interface CampProps {
            id_user_carimbou : number, 
            cpf : string, 
            id_campanha : number
        }

        const {id_user_carimbou, cpf, id_campanha} : CampProps = req.body

        const carimboService = new CarimboService()

       

        const result  = await carimboService.insereCarimbo({id_user_carimbou, cpf, id_campanha})

        if(result.status == true){

            res.json({status: true, mensagem : "Adicionado com sucesso !!!"})
            res.status(200)

        }else{

            res.json({status: false, mensagem : "Carimbo não adicionado"})
            res.status(400)
        }

    }
}
export { CarimboController }