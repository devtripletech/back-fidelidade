import prismaClient from "../../prisma";

class ClientePainel{


    async ListaCampanhaCliente({id_user}){


      
        const listaDetalhado = await prismaClient.$queryRaw `select nome_campanha, qtde_carimbo, nome_empresa from view_resumo_campanha_cliente_painel where id_user = ${id_user}`
        
        const qtdePontosGeral = await prismaClient.$queryRaw `select top 3 qtde_geral_pontos, nome_empresa, data_carimbo, nome_campanha from view_resumo_campanha_empresa_data where id_user = ${id_user}`


        return({status: true, resultado : listaDetalhado, resultadoTotal: qtdePontosGeral})



    }

}

export default ClientePainel