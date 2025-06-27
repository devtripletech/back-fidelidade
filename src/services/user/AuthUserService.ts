import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import {sign} from 'jsonwebtoken'

interface AuthRequest{
    email: string;
    password: string;
}


interface autUser {
    id : number
    name : string
    email : string 
    password : string
    role : number 
    id_empresa : number

}
class AutUserService{

    async execute( {email, password}: AuthRequest){

    
    const validaEmail :autUser = await prismaClient.$queryRaw `select id, name, email, password, role , id_empresa from view_login where email = ${email}`

    console.log(validaEmail)
    console.log(validaEmail[0].id_empresa)


    if(!validaEmail[0].id_empresa){
        throw new Error("User/password incorreto")
    }

    const passwordMatch = await compare(password, validaEmail[0].password)

    if(!passwordMatch){
        throw new Error("Usuario e senha errado")
        
    }

    const token = sign(
        {
            name: validaEmail[0].name,
            email: validaEmail[0].email,
            role: validaEmail[0].role

        },
        process.env.JWT_SECRETE,
        {
            subject: validaEmail[0].id.toString(),
            expiresIn: '1d'
        }
    
    )


    return({
        token: token,
        user: {
        id: validaEmail[0].id,
        email: validaEmail[0].email,
        name: validaEmail[0].name,
        empresaId : validaEmail[0].id_empresa,
        role: validaEmail[0].role
        }
    })

    }

    //se deu tudo certo vamos gerar o token



    async alterarPassword({email, nova_senha}){

    }


   
    

}
export{ AutUserService }