import prismaClient from "../../prisma"

class CategoriaService{

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