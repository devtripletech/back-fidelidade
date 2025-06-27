import prismaClient from "../../../prisma"

class ListaProdutoService{



    async InsereProdutoLista({produtos, id_lista}){
        
        const resultado = await prismaClient.lista_produto.createMany()

    }

    
    async ListaList ({id_lista}){

        try {


            const resultado = await prismaClient.lista.findMany({
                where:{
                    id_lista : Number(id_lista)
                }
            })

            return({stauts: true, resultado : resultado})
            
        } catch (error) {

            console.log(error)
            return({stauts: false})
            
        }
    }

    
    async ProdutoCreate({nome_lista, data_vigencia_inicio, data_vigencia_fim, descricao, id_empresa}){

        try {
            const resultado = await prismaClient.lista.create({
                data:
                {
                    nome_lista : nome_lista,
                    data_vigencia_fim: new Date(data_vigencia_fim),
                    data_vigencia_inicio: new Date(data_vigencia_inicio),
                    descricao : descricao,
                    id_empresa : id_empresa,
                    ativo: 1
                
                }
            })

            return({status : true})
            
        } catch (error) {

            console.log(error)

            return({status : false})
            
        }

        

    }


    async ProdutosLista ({id_lista}) {
        
        try{
            console.log(id_lista)
            const resultado = await prismaClient.produto.findMany()

    
            console.log(resultado)
            return({status: true, resultado : resultado})

        }catch(error){

            return({status: false})

        }
       
    }

    async ListaProduto({id_empresa}){
        
        try {
            
            const resultado = await prismaClient.lista.findMany({where :{
                ativo: 1
            }})

            console.log(resultado)

            return({status: true, resultado : resultado})

        } catch (error) {

            return({status: false})
            
        }
    }


}

export {ListaProdutoService}