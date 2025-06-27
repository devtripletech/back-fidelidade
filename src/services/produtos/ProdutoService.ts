import prismaClient from "../../prisma"

class ProdutoService{

    
    async CreateProduto({nome_produto, id_empresa, id_categoria, valor, descricao} : any){
        try{
            
            const resultado = await prismaClient.produto.create({
                data:{
                    nome_produto : nome_produto,
                    id_empresa : id_empresa,
                    id_categoria : Number(id_categoria),
                    valor : Number(valor),
                    descricao : descricao,
                    ativo : 1
                }
            })

            return ({status : true})

        }catch(error){
            console.log(error)
            return ({status : false})

        }
    }

    async ProdutoCategoria({id_categoria}){
        try {
            
            console.log("chamou")
            const resultado = await prismaClient.produto.findMany({
                where:{
                    id_categoria : id_categoria
                }
            })
            
            console.log(resultado)

            return({status: true, resultado : resultado})
        } catch (error) {

            return({status: false})
            
        }
    }

    async BuscaProdutos({id_empresa}){

        try {
            

            const resultado = await prismaClient.produto.findMany({
                include:{
                    categoria: true
                },
                where:{
                    id_empresa : id_empresa
                }
            })

            return({status: true, resultado : resultado})
            
        } catch (error) {
            console.log(error)
            return({status: false })
            
        }

    }

}

export {ProdutoService}