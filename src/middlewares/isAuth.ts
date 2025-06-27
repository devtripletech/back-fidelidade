import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

interface JwtJsonProps {
  name: string
  id_empresa: number
}

interface JwtPayload {
  sub: string
  email: string
  id_empresa: number
}

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({ error: "Não autorizado!" })
  }

  const [, token] = authToken.split(" ")

  try {
    // Verificar e decodificar o token
    const decoded = verify(token, process.env.JWT_SECRETE!) as JwtPayload

    // Adicionar informações ao request
    req.user_id = decoded.sub
    req.email_user = decoded.email


    next()
  } catch (err) {
    return res.status(401).json({ error: "Token inválido!" })
  }
}