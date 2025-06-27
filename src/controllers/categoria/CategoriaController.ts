import { Request, Response } from "express";
import { CategoriaService } from "../../services/categoria/CategoriaService";

class CategoriaController{

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