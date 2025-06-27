import { Request, Response } from "express";
import { ResgateService } from "../../services/resgate/ResgateService";

class ResgateController{


    async ResgatePontos(req : Request, res : Response){


        const id_campanha = req.params.id_campanha
        const id_user = req.params.id_user


        

        

    }



    async ListResgate(req : Request, res : Response){

        const id_empresa = req.params.id_empresa

        const resgateService = new ResgateService()

        const nome = req.query.nome
        
        console.log(nome)
        try{

            const resul = await resgateService.ListResgate({id_empresa})

            if(resul.status == true){
                res.status(200)
                res.json({status: true, resultado : resul.resultado}) 
            }
        }catch(error){

                res.status(400)
                res.json({status: false}) 
        }


    }

}

export {ResgateController}