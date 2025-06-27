import prismaClient from "../../prisma"

interface MensalProps {
    periodo : string
    valor : number
}


class CrmService{

    async  CrmTotalVendas ({id_empresa}){

        try{

            const resultado : MensalProps[] = await prismaClient.$queryRaw `select * from view_soma_mensal order by periodo`;

            return({status : true, resultado : resultado})

        }
        
        catch(error){
            return({status : false})

        }
      
    }

}

export { CrmService }