import { Request, Response } from "express";

import { ListUserService } from "../../services/user/ListUserService";



class ListUser{

async handle(req: Request, res: Response){

    console.log("entrou")
    const listUserService = new ListUserService(); 

    const user = await listUserService.list();
   
    res.json(user)
    res.status(200)

    }

    async findUsuario_id(req: Request, res : Response){

        const id_user = req.params.id_user 
        console.log("id_user>>> " + id_user)
        const listUserService = new ListUserService(); 

        const resultado = await listUserService.ListId(Number(id_user))

    
       res.json({status: true, resultado : resultado.result})
       res.status(200)

   

    }

    

}


export{ ListUser }