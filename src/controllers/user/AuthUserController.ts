import { AutUserService } from "../../services/user/AuthUserService";
import {Request, response, Response} from 'express'

class AuthUserController{


    async handle(req: Request, res: Response){

        const {email, password} = req.body;

        const autUserService = new AutUserService();
        const auth = await autUserService.execute({email, password})


        
        return res.json(auth)

    }

}


export{ AuthUserController }