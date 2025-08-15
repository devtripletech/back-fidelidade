import { CPFProps, DataStoneProps, UsuarioProps } from "../../interface/interface";

import prismaClient from "../../prisma";
import {hash} from 'bcryptjs'
import { uuid } from "short-uuid";
import { randomUUID } from "crypto";
import { EnviaEmail } from "../../lib/EnviaEmail";

interface ApiCPFProps{
data:[
    {
    cpf : number,
    name: string,
    addresses: [
        {
            type: string,
            street: string,
            number: string,
            complement: string,
            neighborhood: string,
            city: string,
            district : string,
            postal_code: string,
        }
    ],
    birthday : string
    }
]

}

interface ContatosProps
        {
            cpf: string
            email ? :  string ,
            celular : string
        }

class UsuarioService{

    async updateUsuarioEmail({cpf, email, celular} : ContatosProps){


        const findEmail = await prismaClient.user.findMany({
            where:{
                email: email
            }
        })

        console.log(findEmail)
        if(findEmail.length > 0){
            return ({status: false, mensagem: "Não foi possivel realizar o cadastro" })
        }


        const id_user = await prismaClient.user.findFirst({
            where:{
                cpf: cpf
            }
        })


        if(!id_user){
            return ({status: false, mensagem: "Problema para encontrar o CPF" })


        }

        try{

            const updateUsuarioTeleefone = await prismaClient.usuario.updateMany({
                where:{
                    id_user: id_user.id
                },
                data: {
                    celular: celular
                }
            })

            console.log(updateUsuarioTeleefone)


           // let rando = randomUUID()

            let senha = "312cqrWrecvr"
            const _password = await hash(senha, 8)


            const updateUser = await prismaClient.user.update({
                where:{
                    id :  id_user.id
                },
                data: {
                    email: email,
                    password: _password
                }
            })



            const enviaEmail = new EnviaEmail()

            let usuario = email
            
            await enviaEmail.enviaCadastro({usuario, senha})

            return({status: true, mensagem : "Atualizado com sucesso !!"})

        }catch(error){

            return({status: false, mensagem : "Problema para atualizar "})


        }

    }



    async usuarioCheckService({cpf}){

        
        const https = require('https');
        let validacaoEmail = true //variavel criada para validação do usuario esta com os dados corretos ou não.
        
        const usuario = await  prismaClient.usuario.findMany({
            where : {
                cpf : cpf
            }
        })


        const melhoresContatos : ContatosProps[] = await prismaClient.$queryRaw `select email,  celular  from users u inner join usuario us on u.id = us.id_user where u.cpf = ${cpf} `
          
    
        if(melhoresContatos.length > 0 ){


            melhoresContatos.map((contatos, index)=> {
                if(contatos.email.length == 0){

                    validacaoEmail = true

                } else {
                    validacaoEmail = false
                }
    
            })
    

            

            return ({ status : true, resultado : usuario, datastone : false, melhorescontatos : melhoresContatos , validaemail : validacaoEmail})


        }else{
            
            const api = `https://api.datastone.com.br/v1/persons/?cpf=${cpf}&fields=all`
            const axios = require('axios');

            const dados : ApiCPFProps = await axios.get(api, {headers : {
                Authorization : 'Token c0eff22d-d6c5-48e7-8d4e-10810d8f7bc5'
            }})

         


            
            const user = await prismaClient.user.create({
                data:{
                    name: dados.data[0].name,
                    password: "passwordHas",
                    cpf: cpf,
                    role: 0,
                    email : ""
                }, 
                select :{
                    id : true
                }
                
            })
            


            let endereco = ""
            let cidade =  ""
            let bairro =  ""
            let numero =  "0"
            let uf =  ""
            let postalcode = ""


            dados.data.forEach((item, index) => {

                if(item.addresses[index].type != null){

                    endereco =  dados.data[index].addresses[index].street
                    cidade =  dados.data[index].addresses[index].city
                    bairro =  dados.data[index].addresses[index].neighborhood
                    numero =  dados.data[index].addresses[index].number
                    uf =  dados.data[index].addresses[index].district
                    postalcode = dados.data[index].addresses[index].postal_code
  
                }
                if(endereco != ""){

                    return;
                }
            });

            const id_usuario = user.id

            const useEmpresa = await prismaClient.userempresa.create({
                data:{
                    id_empresa : 1,
                    id_user : user.id,
                    role : 0,
              

                }
            })

            let data_aniversario =  new Date(dados.data[0].birthday)
            const insert = await prismaClient.usuario.create({
                data : {
                    id_user: id_usuario,
                    endereco : endereco,
                    cpf : cpf,
                    numero :numero,
                    nome : dados.data[0].name,
                    bairro : bairro,
                    tipo : "1",
                    cidade  : cidade,
                    postalcode : postalcode,
                    celular : "",
                    data_nascimento : data_aniversario,
              
                }

            })

        


            const retun_data  =
            [{
                id_user: id_usuario,
                endereco : endereco,
                cpf : cpf,
                numero : numero,
                nome : dados.data[0].name,
                bairro : bairro,
                tipo : "1",
                cidade  : cidade,
                postalcode : postalcode,
                celular : "",
                email : "",
                telefone: ""
                
                
                
            }] 

            melhoresContatos.map((contatos, index)=> {
                if(contatos.email.length == 0){

                    validacaoEmail = true

                } else {
                    validacaoEmail = false
                }
    
            })
        
         
            return({ status: true , resultado : retun_data, datastone : true, melhorescontatos : melhoresContatos, validaemail : validacaoEmail})
        }

   

    }

}

export { UsuarioService }