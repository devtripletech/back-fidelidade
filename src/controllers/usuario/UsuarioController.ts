import { Request, response, Response } from "express";
import { CPFProps } from "../../interface/interface";
import { UsuarioService } from "../../services/usuario/usuarioService";

class UsuarioController{


    async UpdateUsuarioEmail(req : Request, res : Response){

        const {email, celular} = req.body
        const cpf = req.params.cpf

        console.log(email)
        const usuarioService  = new UsuarioService()

        try{
            const resultado  = await usuarioService.updateUsuarioEmail({email, celular, cpf})

            if(resultado.status == true){

                res.status(200)
                res.json({status: true, mensagem : "Atualizado com sucesso"})

            }else{
                
                res.status(401)
                res.json({status: false, mensagem : "Erro a atualizar"})
            }


        }catch(error){

            res.status(400)
            res.json({status: false, mensagem : "Erro a atualizar"})

        }
        
    }

    async UsuarioCheck(req : Request, res : Response){


        
       const usuarioService  = new UsuarioService()

       const  cpf  = req.params.cpf
  
       const result = await usuarioService.usuarioCheckService({cpf})

       res.json({status : true,  resultado : result.resultado, datastone : result.datastone, melhorescontatos: result.melhorescontatos, validaemail : result.validaemail})
       res.status(200)


    }

}

export { UsuarioController }