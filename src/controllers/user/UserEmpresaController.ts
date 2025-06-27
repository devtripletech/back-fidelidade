import { UserEmpresaService } from "../../services/user/UserEmpresaService"
import { Request, Response } from "express";


interface empresaProps{
    nome : string, 
    sobrenome : string, 
    empresa : string, 
    email : string,  
    cidade: string, 
    endereco: string,  
    estado: string, 
    cep : string 
}


interface UserFunProps{
    email: string,
    nome : string, 
    id_empresa: number
}
class UserEmpresaController {





    async CreateFuncEmpresa(req: Request, res : Response){

        const {email, nome, id_empresa } : UserFunProps = req.body;

        console.log(">>>id_empresa>>> " +  id_empresa)
        try{

            const userEmpresaService = new UserEmpresaService()

            const result = await userEmpresaService.CreateFuncEmpresa({email, nome, id_empresa})

            if(result.status == true){

                res.status(200)
                res.json({status: true, resposta: "Usuário criado com sucesso !!!"})
            }else{
                res.status(400)
                res.json({status: false, resposta: "Erro ao criar usuario"})
            }

        }catch(error){

            res.status(400)
            res.json({status: false, resposta: "Erro ao criar usuario"})
        }

    }


    async createUserEmpresa(req : Request, res: Response){

        const {nome, sobrenome, empresa, email, cidade, endereco, estado, cep} = req.body

        const userEmpresaService = new UserEmpresaService()
        
        try{
           
            const execute = await userEmpresaService.CreateUserEmpresa({nome, sobrenome, empresa, email, cidade, endereco, estado, cep})

            if(execute.status == true){

            res.json({status: true, resposta : execute.resposta})
            res.status(200)

            }else{
                res.json({status: false, resposta : "Erro ao criar empresa"})
                res.status(400)
            }

        }catch(error){

                console.log(error)
                res.status(400)
                res.json({status : false, resposta :  error})
        }
    
    }

}

export {UserEmpresaController}