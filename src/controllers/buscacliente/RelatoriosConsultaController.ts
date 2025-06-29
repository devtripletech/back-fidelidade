import { Request, Response } from "express";
import { RelatoriosConsultaService } from "../../services/buscacliente/RelatorioConsultaService";

class RelatoriosConsultaController{

    async historicoConsulta(req : Request, res : Response){

        const id_user = req.params.id_user


        const id_user_int = parseInt(id_user)
        const relatoriosConsultaService = new RelatoriosConsultaService()

        try {

             const resultado = await relatoriosConsultaService.HistoricoConsulta({id_user_int})
             
             res.json({resultado : resultado.resultado, error: false})

             res.status(200)
            
        } catch (error) {

            res.status(401)
            res.json({error: true})
            
        }
        
     

        
        
    }



}


export {RelatoriosConsultaController}