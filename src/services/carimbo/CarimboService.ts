import { CarimboProps } from "../../interface/interface";
import prismaClient from "../../prisma";
import { ClienteService } from "../clientes/ClientesService";


export interface EmpresaProps {
    id_empresa : number
}

interface EnvioCampanhaProps{
    nome_campanha : string
    celular : string
}


class CarimboService{



    async BuscaCarimboClienteGeral({id_empresa}){

        try{

            const result = await prismaClient.$queryRaw `select * from view_painel_pontuacal_campanha = ${ id_empresa } `
            
            return({status : true, resultado : result})

        }catch(error){

            return({status : false, resultado: error})
        }
  
    }

    async insereCarimbo({id_user_carimbou, cpf, id_campanha} : CarimboProps){ 

        try{

            cpf = cpf.replace('-','').replace('.','').replace('.','')
            const clienteService = new ClienteService()
         

            
            console.log(cpf)
            const id_user = await prismaClient.user.findMany({
                where:{
                    cpf : cpf
                },
                select: {
                    id : true,
                }
            })


            console.log(id_user_carimbou)
            const id_empresa = await prismaClient.empresa.findMany({
                where:{
                    id_user : id_user_carimbou
                },
                select: {
                    id_empresa: true
                }
            })

            const check_user_empresa = await prismaClient.userempresa.findMany({
                where:{
                    AND :[    
                   { id_empresa : id_empresa[0].id_empresa },
                    { id_user : id_user[0].id}
                    ]             
                }
            })

            if(check_user_empresa.length <= 0){
                await prismaClient.userempresa.create({
                    data:{
                        id_empresa: id_empresa[0].id_empresa,
                        id_user : id_user[0].id,
                        role : 0
                    }
                })
            }
            
            const qtde_carimbo = await prismaClient.campanha.findFirst({
                where:{
                    id_campanha : id_campanha * 1
                }
            })

            
            await prismaClient.carimbo.create({

                data :
                {
                    id_user_carimbou : id_user_carimbou,
                    id_user : id_user[0].id,
                    id_campanha : id_campanha * 1,
                    qtde_carimbo : qtde_carimbo.qtde_servico
                
                }
              
            })

            
            const resultado : EnvioCampanhaProps[]= await prismaClient.$queryRaw `select distinct * from view_usuario_campanha_telefone where id_campanha =${id_campanha} and id = ${id_user[0].id} and id_empresa=${id_empresa[0].id_empresa}`
            
            resultado.forEach(element  => {
                let messagem  = `Parabens você acumulou pontos na promoção ${element.nome_campanha} data ${new Date()}`
                let number = element.celular
               clienteService.sendMensagemSMS({messagem, number})

                
            });



            return ({ status : true})

        }catch(error){
            console.log(error)
            return ({ status : false})

        }



    }

}

export { CarimboService }