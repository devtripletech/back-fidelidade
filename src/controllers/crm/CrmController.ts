import { Request, Response } from "express";
import { CrmService } from "../../services/crm/CrmService";

class CrmController {

    async crmTotalVendas(req : Request , res : Response){

        const id_empresa = req.params.id_empresa

        const crmService = new CrmService()
        const resultado = await crmService.CrmTotalVendas({id_empresa})

        if(resultado.status == true){

            res.status(200)
            res.json({resultado : resultado.resultado, status: true})
        }
        else{
            res.status(400)
            res.json({ status: false, mensagem :  "Erro ao carregar os dados." })
        }

    }

}
export { CrmController }