import axios from "axios"
import prismaClient from "../../prisma";
import { cp } from "fs";
import redis from "../../lib/redis";

class BuscaClienteService{



async BuscaClienteApi ({nome, cpf, celular, chaveapi}){
    try{


        console.log(cpf + ">>>>>> console cpf service")
        let consulta = ""
        const chaveRedis = `api-chave${chaveapi}`
        const id_user_redis = await redis.get(chaveRedis)
        const dadosredisJson = JSON.parse(id_user_redis)
        

        if(cpf != '' || cpf != undefined){

            //gera log da consulta
            consulta = `Consulta realizada no CPF : ${cpf}`
            
            //replace caso venha com pontos o cpf
            cpf = cpf.replace('-','').replace('.','').replace('.','')

            const resultado = await prismaClient.dados_fisica.findMany({
                where:{
                    cpf : cpf
                }
            })

            if(resultado.length <= 0){

                const api = `https://api.datastone.com.br/v1/persons/?cpf=${cpf}&fields=all`
                const axios = require('axios');

                const dados = await axios.get(api, {headers : {
                    Authorization : `Token ${process.env.API_DATASTONE}`
                }})

                if(dados.data.length > 0){
                        const resultadoGeral = {
                                "nome" : dados.data[0].name,
                                "cpf" : dados.data[0].cpf.toString(),
                                "tipo_end" : dados.data[0].addresses[0].type,
                                "rua" : dados.data[0].addresses[0].street,
                                "numero" : dados.data[0].addresses[0].number,
                                "complemento" : dados.data[0].addresses[0].complemento,
                                "cidade" : dados.data[0].addresses[0].city,
                                "uf" : dados.data[0].addresses[0].district,
                                "cep" : dados.data[0].addresses[0].postal_code,
                                "morto": dados.data[0].possibly_dead,
                                "celular_ddd" : dados.data[0].mobile_phones[0].ddd,
                                "celular_number" : dados.data[0].mobile_phones[0].number,
                                "connect_whats" : dados.data[0].mobile_phones[0].whatsapp_datetime,
                                "rg" : dados.data[0].rg,
                                "bairro" : dados.data[0].addresses[0].neighborhood,
                                "nome_mae" : dados.data[0].mother_name,
                                "data_aniversaio" : dados.data[0].birthday
                        } 


                        const resultado = await prismaClient.dados_fisica.create({

                            data:{
                                "nome" : dados.data[0].name,
                                "cpf" : cpf,
                                "tipo_end" : dados.data[0].addresses[0].type,
                                "rua" : dados.data[0].addresses[0].street,
                                "numero" : dados.data[0].addresses[0].number,
                                "cidade" : dados.data[0].addresses[0].city,
                                "uf" : dados.data[0].addresses[0].district,
                                "cep" : dados.data[0].addresses[0].postal_code,
                                "morto": dados.data[0].possibly_dead,
                                "celular_ddd" : dados.data[0].mobile_phones[0].ddd,
                                "celular_number" : dados.data[0].mobile_phones[0].number,
                                "connect_whats" : new Date(dados.data[0].mobile_phones[0].whatsapp_datetime),
                                "rg" : dados.data[0].rg,
                                "bairro" : dados.data[0].addresses[0].neighborhood,
                                "nome_mae" : dados.data[0].mother_name,
                                "data_aniversaio" : new Date(`${dados.data[0].birthday}T00:00:00Z`) 
                            },
                            select:{
                                id : true
                            }
                    
                        })

                        const inser_log = await prismaClient.consulta_insere_log.create({
                        data:{
                            id_user : dadosredisJson.id_user,
                            debito : -1,
                            fonte_propria : 1,
                            data_cadastrou : new Date(), 
                            consulta : consulta,
                            id_dados_fisica : resultado.id ?? 0
                        
                        }
                    })


                         return resultadoGeral
                } else {
                    
                               const inser_log = await prismaClient.consulta_insere_log.create({
                        data:{
                            id_user : dadosredisJson.id_user,
                            debito : -1,
                            fonte_propria : 1,
                            data_cadastrou : new Date(), 
                            consulta : consulta,
                            id_dados_fisica : 0
                        
                        }
                    })
                }   
                  

                if(dados == undefined){
                            return 
                }

             
            
            }else{

                const inser_log = await prismaClient.consulta_insere_log.create({
                    data:{
                        id_user : dadosredisJson.id_user,
                        debito : -1,
                        fonte_propria : 1,
                        data_cadastrou : new Date(), 
                        consulta : consulta,
                        id_dados_fisica : resultado[0].id

                    
                    }
                })
                
                return resultado[0]

            }

        }


    }catch(error){

        
            console.log(error)

        }
    }

async BuscaCliente ({nome, cpf, celular, id_user}){
    try{

        let consulta = ""
       
        if(cpf != '' || cpf != undefined){

            //gera log da consulta
            consulta = `Consulta realizada no CPF : ${cpf}`
            
            cpf = cpf.replace('-','').replace('.','').replace('.','')

            const resultado = await prismaClient.dados_fisica.findMany({
                where:{
                    cpf : cpf
                }
            })

            if(resultado.length <= 0){

               
                const api = `https://api.datastone.com.br/v1/persons/?cpf=${cpf}&fields=all`
                const axios = require('axios');

                const dados = await axios.get(api, {headers : {
                    Authorization : `Token ${process.env.API_DATASTONE}`
                }})

                console.log(dados.data[0])

                console.log(">>>>> fimmm")


                let telefone_complementar = []

                if(dados.data[0].mobile_phones.length >= 1){
                    dados.data[0].mobile_phones.forEach(element => {
                         let array = {
                            "ddd" : element.ddd,
                            "celular_number" : element.number
                        }

                    telefone_complementar.push(array)

                    });
                }
            
                console.log(telefone_complementar)
                
                
                        const resultadoGeral = {
                        "nome" : dados.data[0].name,
                        "cpf" : cpf,
                        "tipo_end" : dados.data[0].addresses[0].type,
                        "rua" : dados.data[0].addresses[0].street,
                        "numero" : dados.data[0].addresses[0].number,
                        "complemento" : dados.data[0].addresses[0].complemento,
                        "cidade" : dados.data[0].addresses[0].city,
                        "uf" : dados.data[0].addresses[0].district,
                        "cep" : dados.data[0].addresses[0].postal_code,
                        "morto": dados.data[0].possibly_dead,
                        "celular_ddd" : dados.data[0].mobile_phones[0].ddd,
                        "celular_number" : dados.data[0].mobile_phones[0].number,
                        "connect_whats" : dados.data[0].mobile_phones[0].whatsapp_datetime,
                        "rg" : dados.data[0].rg,
                        "bairro" : dados.data[0].addresses[0].neighborhood,
                        "nome_mae" : dados.data[0].mother_name,
                        "data_aniversaio" : dados.data[0].birthday,
                        "telefone_complementar" : telefone_complementar
                    
                } 


                    const resultado = await prismaClient.dados_fisica.create({

                        data:{
                            "nome" : dados.data[0].name,
                            "cpf" : cpf,
                            "tipo_end" : dados.data[0].addresses[0].type,
                            "rua" : dados.data[0].addresses[0].street,
                            "numero" : dados.data[0].addresses[0].number,
                            "cidade" : dados.data[0].addresses[0].city,
                            "uf" : dados.data[0].addresses[0].district,
                            "cep" : dados.data[0].addresses[0].postal_code,
                            "morto": dados.data[0].possibly_dead,
                            "celular_ddd" : dados.data[0].mobile_phones[0].ddd,
                            "celular_number" : dados.data[0].mobile_phones[0].number,
                            "connect_whats" : new Date(dados.data[0].mobile_phones[0].whatsapp_datetime),
                            "rg" : dados.data[0].rg,
                            "bairro" : dados.data[0].addresses[0].neighborhood,
                            "nome_mae" : dados.data[0].mother_name,
                            "data_aniversaio" : new Date(`${dados.data[0].birthday}T00:00:00Z`) 
                        },
                        select:{
                            id : true
                        }
                  
                    })
                    
                    //insere o telefone complementar
                    for (let index = 0; index < telefone_complementar.length; index++) {

                        await prismaClient.telefone_comp.create({
                            data :{
                                ddd : telefone_complementar[index].ddd.toString(),
                                telefone : telefone_complementar[index].celular_number,
                                id_dados_fisica : resultado.id
                            }
                        })
                        
                    }
            
                    const inser_log = await prismaClient.consulta_insere_log.create({
                        data:{
                            id_user : id_user,
                            debito : -1,
                            fonte_propria : 1,
                            data_cadastrou : new Date(), 
                            consulta : consulta,
                            id_dados_fisica : resultado.id
                        
                        }
                    })

                    return resultadoGeral
            
            }else{

                const inser_log = await prismaClient.consulta_insere_log.create({
                    data:{
                        id_user : id_user,
                        debito : -1,
                        fonte_propria : 1,
                        data_cadastrou : new Date(), 
                        consulta : consulta,
                        id_dados_fisica : resultado[0].id

                    
                    }
                })
                
                return resultado[0]

            }

        }


    }catch(error){

        
            console.log(error)

        }
    }

}

export { BuscaClienteService }