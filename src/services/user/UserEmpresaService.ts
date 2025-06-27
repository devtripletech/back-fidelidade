import prismaClient from "../../prisma"
import { EmpresaService } from "../empresa/EmpresaService"
import { CreateUserService } from "./CreateUserService"

class UserEmpresaService{



    async CreateFuncEmpresa({email, nome, id_empresa }){


        try{
            
            const password  = "Teste01"

            const name = nome
    
            const createUserService = new CreateUserService()
            const userEmpresa = 0
    
            const userCreate = await createUserService.execute({name , email, password , userEmpresa})
            if(userCreate.user.id){
            
                const empresaUser = await prismaClient.userEmpresa.create({

                    data:{

                        id_empresa: id_empresa,
                        id_user : userCreate.user.id,
                        role : 0
                    }

                })
            
            }

            return({status : true, resposta : "Usuário serviço criado com sucesso"})

        }catch(error){

            console.log(error)
            return({status : false, resposta : "Usuário serviço com erro"})

        }



    }


    async CreateUserEmpresa ({empresa, nome, sobrenome, email , endereco, cidade, estado, cep}){

        const password  = "Teste01"

        const name = nome

        const createUserService = new CreateUserService()

        const userCreate = await createUserService.execute({name , email, password })
        
        if(userCreate.user.id){

            const cnpj = "teste"
            const nome_empresa = empresa
            const id_user = userCreate.user.id
            const empresaService = new EmpresaService()
            const criaEmpresa = await empresaService.create({nome_empresa, id_user, cnpj})
            
             if(criaEmpresa.status == true){

                return({status: true, resposta: "Empresa Criada com sucesso"})
             }
        }

    }


}

export {UserEmpresaService}