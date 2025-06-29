import prismaClient from "../../prisma"

class RelatoriosConsultaService{

   async HistoricoConsulta ({id_user_int} : any){

    try{

        const resultado = await prismaClient.$queryRaw `select nome, cpf , data_aniversaio , ultima_consulta  from view_consulta_resumo_log vcrl where id_user  = ${id_user_int};`

        return {resultado : resultado, status : true}

    }catch(error){

        console.log(error)

    return {status : false}


    }

   }

}

export { RelatoriosConsultaService }