import prismaClient from "../../prisma"

class CategoriaService{


        async categoriaCriar({id_empresa, nome_categoria, ativo, icon}){

            try{
                const resultado = await prismaClient.categoria.create({
                data:{
                    id_empresa : id_empresa,
                    nome_categoria: nome_categoria,
                    ativo : ativo,
                    icon : icon
                }
            })
            return({status : true})

        }catch(error){
            
            return({status : false})

        }
       
            

        }


        async categoriaLista (){
            try {
                
                const resultado = await prismaClient.categoria.findMany({
                    where:{
                        ativo: 1
                    }
                })

                console.log(resultado)

                return({status: true, resultado : resultado})


            } catch (error) {

                console.log(error)
                return({status: false})

            }
        }

}

export { CategoriaService}