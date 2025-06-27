import { Request, Response } from "express";
import { ProdutoService } from "../../services/produtos/ProdutoService";

interface CategoriaProps{
    nome_produto : string, 
    id_empresa : number, 
    id_categoria : number, 
    valor : number, 
    descricao : string
}
class ProdutoController{



    async criarProduto (req : Request, res : Response){

        try {

            const id_empresa = Number(req.params.id_empresa)
            const {nome_produto, id_categoria, valor, descricao} : CategoriaProps = req.body

            const produtoService = new ProdutoService()

            const resultado = await produtoService.CreateProduto({nome_produto, id_empresa, id_categoria, valor, descricao})

            if(resultado.status == true){

                res.status(200)
                res.json({status: true})

            }else{
                res.status(200)
                res.json({status: false})
            }
            
        } catch (error) {
            console.log(error)
            res.status(400)
            res.json({status: false})

        }
    }

    async produtoCategoria (req : Request, res : Response){

        try {
             const id_categoria = req.params.id_categoria
        
            const produtoService = new ProdutoService()

            const resultado = await produtoService.ProdutoCategoria({id_categoria})


            res.json({status : true, resultado: resultado.resultado})
            res.status(200)
         
            
        } catch (error) {
            
            console.log(error)
            res.status(400)

            res.json({status : false})
        }
    }
    async buscaProduto(req : Request, res : Response){


    
        try {
            const id_empresa = Number(req.params.id_empresa)
            
            const produtoService = new ProdutoService()
            const resultado = await produtoService.BuscaProdutos({id_empresa})

            res.json({status: true, resultado : resultado.resultado})

            res.status(200)

     

        } catch (error) {

            res.json({status: false})

            res.status(400)
        }

    

    }


}

export { ProdutoController}