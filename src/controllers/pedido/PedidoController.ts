import { Request, Response } from "express";
import { PedidoService } from "../../services/pedido/PedidoService";
import JSONBig from "json-bigint";
class PedidoController{


    async listaPedido(req : Request, res : Response){

        const id_empresa = req.params.id_empresa
        const pedidoService = new PedidoService()
        try {

            const resultado = await pedidoService.ListaPrdido({id_empresa})

            res.status(200)

            const resul = JSONBig.stringify(resultado.resultado)
            res.json({status: true, resultado : JSON.parse(resul)})
            
        } catch (error) {
        console.log(error)
        res.status(400)
        res.json({status: false})

        }


    }


    async inserePedido(req : Request, res : Response){

      
        const {itens , user} = req.body

        const pedidoService = new PedidoService()
       const result = await pedidoService.InserePedido({itens, user} )

        res.status(200)
        res.json({status: true})


    }

}

export { PedidoController }