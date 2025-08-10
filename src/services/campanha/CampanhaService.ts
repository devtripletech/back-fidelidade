
import { CampanhaProps } from "../../interface/interface";
import prismaClient from "../../prisma";


class CamapanhaService{


 
    /*

    async campanha_cards({id_empresa, id_campanha}){

        try{

            const prismaClient.cama

        }catch(error){

        }

    }
        */


    async campanha_msg_lista({id_empresa}){
        try{

            const resultado = await prismaClient.campanha_msg.findMany({
                where:{
                    id_empresa : id_empresa
                }
            })

            console.log(resultado)

            return({status: true, resultado : resultado})

        }catch(error){

            console.log(error)

            return({status: false})

        }

    }


    async listaEditarCampanha({id_campanha}){
        try{


            const resultado = await prismaClient.campanha.findMany({
                where:{
                    id_campanha : id_campanha
                }   
            })

            return ({status : true, resultado : resultado})
            
        }catch(error){
            return ({status : false, })
        }
    }

    async campanha_msg({mensagem, id_empresa, id_user, nome}){

        try{

            const resultado = await prismaClient.campanha_msg.create({
                data:{
                    id_empresa : id_empresa,
                    mensagem : mensagem,
                    id_user: id_user,
                    nome : nome
                }
            })

            return({status : true, mensagem : "Criado msg com sucesso"})


        }catch(error){
            console.log(error)
            return({status : false, mensagem : "Erro ao criar"})

        }

    }


async campanhaCliente({id_user}){

    try{
    
        const resultado = await prismaClient.$queryRaw `select distinct nome_campanha, id, id_campanha, qtde_servico  from view_campanha_user_simplificado where id = ${id_user} order by qtde_servico desc`

        console.log(resultado)

        return({status: true, resultado : resultado})

    }catch(error){

        console.log(error)
        return({status: false})

    }
}  


async ClienteExtranho({id_user, id_campanha}){

    try{

        console.log(id_campanha)
        console.log(id_user)

        const resultado = await prismaClient.$queryRaw `select * from view_extrato_campanha where id_user = ${id_user} and id_campanha = ${id_campanha}`

        return({status: true, resultado : resultado})

    }catch(error){

        return({status: false})
    }


}




    async campaFormulario({token, nome, email, cpf, celular}){
        try{


            /*
            const buscaToken = await prismaClient.campanha_token.findFirst({
                where: {
                    token: token
                },
                select:{
                    id_campanha_token : true
                }
            
            })

            */
            
            const buscaToken : any = await prismaClient.$queryRaw `select * from campanha_token where token = ${token} and utilizado = 0`

            if(buscaToken.length > 0){
                const resultado = await prismaClient.campanha_formulario.create({
                    data:{
                        nome: nome,
                        token: token,
                        email: email, 
                        cpf: cpf,
                        celular : celular
                    },
                    select:{
                        id_campanha_formulario : true
                    }
                })
    
                const update_token = await prismaClient.campanha_token.updateMany({
                    where :{
                        token: token
                    },
                    data:{
                        utilizado : 1
                    }
                })
    
    
                return ({status : true, resultado: "Criado com sucesso!!"})

            }else{
                return ({status : false, resultado: "Token não é valido"})
            }

        
           
        }catch(errro){

            return ({status : false, resultado: "Erro ao tentar criar!!"})
        }
    }


    async updateCampanha ({id_campanha, nome_campanha, data_inicio, data_fim, qtde_servico, id_empresa, descricao, id_user }: CampanhaProps) {

        try{

            const resultado = await prismaClient.campanha.update({
                where : {
                    id_campanha : id_campanha
                }, data:{
                    nome_campanha: nome_campanha,
                    data_fim: data_fim, 
                    data_inicio: data_inicio,
                    qtde_servico: qtde_servico,
                    descricao: descricao
                }
            })

            console.log(resultado)
            return({ status: true })

          
        }catch(error){

            console.log(error)
            return({status : false})
        }

    }

    async ListCampanhas(id_empresa){
        console.log(">>empresa " + id_empresa)

        try{
            /*
            const result = await prismaClient.campanha.findMany({
                where:{
                    id_empresa : id_empresa
                }
            })
            */

            const result = await prismaClient.$queryRaw `select * from campanha where id_empresa = ${id_empresa}`

            return({status: true, resultado : result})

        }catch(error){

            console.log(error)

        }

    }

    async resumoCamapnha(id_empresa){
        
        const result = await prismaClient.$queryRaw `select top 4 * from view_resumo_card_campanha where id_empresa = ${id_empresa} order by qtde_carimbo desc`
        
        return({status : true, resultado : result})

    }
    async createCampanha ({reward, mensagem_cliente, nome_campanha, data_inicio, data_fim, qtde_servico, id_empresa, descricao, id_user,  gera_token, nro_campanha_cliente, qtde_token, qtde_pontos, id_campanha_msg }: CampanhaProps){

        try{

            const result  =  await prismaClient.campanha.create({
                data :{
                    recompensa : reward,
                    nome_campanha : nome_campanha,
                    data_inicio : data_inicio,
                    data_fim : data_fim,
                    qtde_servico : qtde_servico,
                    id_empresa : id_empresa,
                    descricao : descricao,
                    nro_campanha_cliente : nro_campanha_cliente,
                    gera_token: gera_token,
                    qtde_token : qtde_token,
                    qtde_pontos : qtde_pontos,
                    id_user : id_user,
                    mensagem_cliente : mensagem_cliente,
                },  
                select:{

                    id_campanha : true
                }
               
            })
/*
            if(gera_token == 1){

                const short = require('short-uuid');
            
                let contador = 0
                let token 

                while (qtde_token > contador) {

                    token  = await short.generate()
                    let _id_campanha = result.id_campanha

                    const resultado = await prismaClient.campanha_token.create({
                        data :{

                            id_campanha : _id_campanha,
                            token : token,
                           utilizado : 0,
                           gerado : 0


                        }
                    })

                    contador = contador + 1
                    
                }

            }
                */

            return({status : true})

        }
        catch(error){
     
            console.log(error)
            return({status : false})
        }

    

    }
}

export {CamapanhaService}