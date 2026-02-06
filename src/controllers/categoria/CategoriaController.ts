import { Request, Response } from "express";
import { CategoriaService } from "../../services/categoria/CategoriaService";

class CategoriaController{


    async CategeriaCriar(req : Request, res : Response){

        const {id_empresa, nome_categoria, ativo, icon} = req.body

        const _categogoriaCriar = new CategoriaService()

        const resultado = await _categogoriaCriar.categoriaCriar({id_empresa, nome_categoria, ativo, icon})

        if(resultado.status == true){

            res.json({mensagem : "Criado com sucesso"})
            res.send(200)
        }
        else{
            res.send(400)
        }

    }

    async CategoriaLista(req : Request, res : Response){

        try{

            const categoriaService = new CategoriaService()

            const resultado = await categoriaService.categoriaLista()

            if(resultado.status == true){
                
                res.json({status: true, resultado : resultado.resultado})
                res.status(200)

            }else{

                res.json({status: false})
                res.status(400)
            }


        }catch(error){
            res.json({status: false})
            res.status(400)
        }

    }
}

export {CategoriaController}