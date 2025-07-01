import prismaClient from "../../prisma"
import { format, startOfMonth } from 'date-fns';
class RelatoriosConsultaService{

   async HistoricoConsulta ({id_user_int} : any){

    try{


        const firstDay = startOfMonth(new Date());
        const formatted = format(firstDay, 'yyyy-MM-dd');

        const dia = format(new Date(), 'yyyy-MM-dd');

     
        const query_soma = `select cast(sum(debito * -1) as int) as total, id_user from public.consulta_insere_log where id_user = ${id_user_int} and data_cadastrou  >=  '${dia}'ç group by id_user;`
       
        const soma_dia = await prismaClient.$queryRawUnsafe(query_soma)

        const soma = await prismaClient.$queryRawUnsafe(`select cast(total_geral as int) total_geral from public.view_rel_dash_mes_ano where id_user = ${id_user_int};`)

        const total_mes = await prismaClient.$queryRawUnsafe(`select cast(sum(debito * -1) as int) as mes from consulta_insere_log cil  where id_user = 2 and data_cadastrou >= '${formatted}';`)

        const resultado = await prismaClient.$queryRaw `select nome, cpf , data_aniversaio , ultima_consulta , cast(qtde_consulta as int) as qtde_consulta from public.view_consulta_resumo_log vcrl where id_user  = ${id_user_int};`


        console.log(soma)
        
        return ({resultado : resultado, soma_total : soma, soma_dia : soma_dia, tota_mes : total_mes,  status : true})

    }catch(error){

        console.log(error)

    return ({status : false})


    }

   }

}

export { RelatoriosConsultaService }