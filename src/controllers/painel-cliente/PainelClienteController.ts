import { Request, Response  } from "express"
import ClientePainel from "../../services/painel-cliente/Cliente";


class PainelClienteController{

    async ListPainelController(req : Request, res : Response){

        const id_user = req.params.id_user

        const clientePainel = new ClientePainel();
        const result = await clientePainel.ListaCampanhaCliente({id_user})
        
        res.status(200);
        res.json({status: true, resultado : result.resultado, resultadoTotal : result.resultadoTotal})


    }

}

export default PainelClienteController