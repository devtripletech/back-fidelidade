import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { hashSync } from 'bcryptjs'
import redis from "../lib/redis"
import prismaClient from "../prisma"



interface JwtJsonProps {
  name: string
  id_empresa: number
}

interface JwtPayload {
  sub: string
  email: string
  id_empresa: number
}

export  async function isAuthApiKey(req: Request, res: Response, next: NextFunction) {

  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({ error: "Não autorizado!" })
  }

  const [, token] = authToken.split(" ")

  try {

    const apikey = authToken.split(" ")
    console.log(apikey[1])


    if(apikey[0] == 'Api-key'){
    
    //verificaou se tem api key
      const chaveRedis = `api-chave${apikey[1]}`
      const buscaRedis = await redis.get(chaveRedis)

      if(buscaRedis == null){

        const buscaBancoApi = await prismaClient.empresa.findMany({
            where:{
                apikey: apikey[0]
            },
            select:{
                apikey : true,
                id_empresa : true,
                id_user : true
            }
        })

        if(buscaBancoApi.length <= 0){

            //caso não encontro no banco tambem ja vai dar erro
             return res.status(401).json({ error: "Token inválido!" })

        }else{

            //casso entre no banco vai subir pro redis
        const dadosApiKey = {
            apikey : buscaBancoApi[0].apikey,
            empresa : buscaBancoApi[0].id_empresa,
            id_user : buscaBancoApi[0].id_user
      }
      //seta a api key
         await redis.set(`api-chave${apikey[1]}`, JSON.stringify(dadosApiKey))

        next()
        }

      }else{
           next()
      }
      
    }else{

    

    // Verificar e decodificar o token
    const decoded = verify(token, process.env.JWT_SECRETE!) as JwtPayload

    // Adicionar informações ao request
    req.user_id = decoded.sub
    req.email_user = decoded.email


    next()
    }
  } catch (err) {
    return res.status(401).json({ error: "Token inválido!" })
  }
}