import { EmpresaCadastrouProps, EmpresaProps } from "../../interface/interface";
import prismaClient from "../../prisma";


class EmpresaService{


    async create ({nome_empresa, id_user, cnpj} : EmpresaCadastrouProps){

        try{
            const result = await prismaClient.empresa.create({ 
                data:{
                    nome_empresa : nome_empresa,
                    id_user: id_user
                    
                },
                select:{
                    id_empresa: true
                
            }
        })

        const serEmpresa = await prismaClient.userEmpresa.create({
            data:{
                id_empresa : Number(result.id_empresa),
                role : 1,
                id_user: id_user
                
            }
        })



            return ({ status: true})
    
        }catch(error){
            console.log(error)
            return ({ status: false})

        }
    }

    async listEmpresa (){

        try{
            const resultado : EmpresaProps[] = await prismaClient.empresa.findMany()

            return ({ status: true, result : resultado})
    
        }catch(error){

            console.log(error)
            return ({ status: false})

        }

    }

    async listEmpresaUserId (id_user : number){

        try{
            const resultado : EmpresaProps = await prismaClient.empresa.findFirst(
                {
                    where:{
                        id_user : id_user
                    }
                }
            )

            return ({ status: true, result : resultado})
    
        }catch(error){
            
            console.log(error)
            return ({ status: false})

        }

    }

}

export { EmpresaService }