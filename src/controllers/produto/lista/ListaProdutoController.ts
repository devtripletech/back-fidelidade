import { Request, Response } from "express";
import { ListaProdutoService } from "../../../services/produtos/lista/ListaProdutoService";

class ListaProdutoController{



    async insereProdutoLista(req : Request , res :Response){

        const {produtos} = req.body

        console.log(produtos)

        produtos.map((resp, i)=>{
            console.log(resp.nome)
        })


        res.status(200)
        res.json({status : true})

    }

    async listaList(req : Request, res : Response){
        
        try {

            const id_lista = req.params.id_lista
            const listaProdutoService = new ListaProdutoService()
            const result = await listaProdutoService.ListaList({id_lista})

            if(result.stauts == true){
                res.status(200)
                res.json({status : true, resultado : result.resultado})
            }else{
                res.status(400)
                res.json({status : false})
            }
            
        } catch (error) {

            console.log(error)
            res.status(400)
            res.json({status : false})
            
        }

    }

    async criarLista (req : Request, res : Response){
        
        console.log("chamou")

        try{
            const {nome_lista, data_vigencia_fim, data_vigencia_inicio, descricao, id_empresa} = req.body
            const listaProdutoService = new ListaProdutoService()
            const result = await listaProdutoService.ProdutoCreate({nome_lista, data_vigencia_fim, data_vigencia_inicio, descricao, id_empresa}) 

            if(result.status == true){
                res.status(200)
                res.json({status: true, mensagem: "Lista criada com sucesso!"})
            }
            else {
                res.json({status: false, mensagem : "Erro ao tentar criar a lista"})
                res.status(400)
            }


        }catch(error){
            res.json({status: false, mensagem : "Erro ao tentar criar a lista"})
            res.status(400)
        }
        
    }

    async produtosLista(req : Request, res : Response){
        try {
   
            const id_lista = req.params.id_lista
            const listaProdutoService = new ListaProdutoService()

            const result = await listaProdutoService.ProdutosLista({id_lista})

            res.status(200)
            res.json({status: true, resultado: result.resultado})

        } catch (error) {
            
            res.json({status: false})
            res.status(400)
        }

    }
    async listaProduto(req : Request, res : Response){
        

        try {
            console.log("chamou")
            const id_empresa = req.params.id_empresa

            const listaProdutoService = new ListaProdutoService()
    
            const result = await listaProdutoService.ListaProduto({id_empresa})
    
            res.status(200)
            res.json({status: true, resultado: result.resultado})
            
            
        } catch (error) {

            res.json({status: false})
            res.status(400)
        }
    }

}

export { ListaProdutoController}