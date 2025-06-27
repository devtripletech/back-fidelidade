import prismaClient from "../../prisma"

class PedidoService{

    async  ListaPrdido({id_empresa}) {
        try {

            const resultado = await prismaClient.$queryRaw `select * from view_pedido where id_empresa = ${id_empresa}`
            return ({status : true, resultado : resultado})

        } catch (error) {
            console.log(error)
            return ({status : false})
        }
        
    }
 

    async InserePedido({ itens, user }){

      

        try {
            let id_pedido = 0
            let resul
            console.log(itens)
            let contador : number = 0


           const resultado = await prismaClient.pedido.create({
                data:{
                    id_lista: 4,
                    id_user : 2,
                    total : 0,
                },
                select:{
                    id_pedido : true
                }
          
            });
            
            itens.map( async (item, index) =>{
            
                    resul =  await prismaClient.pedido_item.create({
                        data:{
                            id_pedido : resultado.id_pedido,
                            id_produto: item.id_produto,
                            qtde : item.quantidade_selecionada,
                            valor_unit : Number(item.valor)
                            }
                        })           
        })
        return({status : true})    
    }
    catch(error) {
            console.log(error)
            return({status : false})
        }
   

    }

  

}

export { PedidoService }