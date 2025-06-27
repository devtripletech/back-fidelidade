import prismaClient from "../../prisma";


class DetailsUserService {

    async execute(user_id: number){

        const result = await prismaClient.user.findFirst({
            where:{

                id:user_id
            }, select:{
                id: true,
                name: true,
                email: true 
            }
        })

        return result
    }



    
}

export{ DetailsUserService }