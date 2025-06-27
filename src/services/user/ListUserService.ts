import prismaClient from "../../prisma";


class ListUserService {

    async list(){

        const result = await prismaClient.user.findMany()

        return result
    }



async ListId (id_user : number){


    try{

        const result = await prismaClient.user.findFirst({
            where: {
                id  : id_user
            }
        })
    
        return({ status: true, result : result })

    }catch(error){

        console.log(error)
        return

    }
     



}

}
export{ ListUserService }