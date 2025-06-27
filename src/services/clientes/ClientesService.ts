import { mensagemProps } from "../../controllers/clientes/ClientesController";
import prismaClient from "../../prisma"
const { format } = require('date-fns');


class ClienteService{



    async QtdeClienteEmpresa ({id_empresa}){
        try {

            const resultado = await prismaClient.$queryRaw `select * from view_qtde_cliente_empresa where id_empresa = ${id_empresa}`
            return ({status : true, resultado : resultado})


        } catch (error) {

            return ({status : false})
            
        }
    }

    async sendMensagemSMS({messagem, number} : mensagemProps){

        const client = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
        client.messages
            .create({
                body: `${messagem}`,
                        from: '+19142923536',
                       
                to: `+55${number}`
            })
            .then(message => console.log(message.sid));

            return({status: true})

    }

 

    async buscaClienteBonus({id_empresa}){



        try{
            const resultado = await prismaClient.$queryRaw `select top 5 Name, qtde_carimbo, nome_campanha, data_ultimo_carimbo from view_usuario_carimbo_campanha where id_empresa = ${id_empresa} order by qtde_carimbo desc`
            return({status: true, resultado : resultado})
        }catch(error){
            return({status: false})
        }
       
    }
    async ListaClientesEmpresa({id_empresa, id_campanha, name, datainicio, datafim}){

    
        try{
            let where = ""
            let resultado = ``
    

            if(name != ""  && id_campanha != 0 || name != undefined  && id_campanha != undefined )
            {   

                let campanha  = ``
                if(id_campanha == 0 ){
                    campanha = `id_campanha in(select id_campanha from campanha where id_empresa = ${id_empresa})`
                }else{

                    campanha = `id_campanha = ${id_campanha}`
                }
              //  console.log(datafimnew)
                //console.log(`SELECT id_campanha, id_empresa, name, email, data_cadastrou, nome_campanha, qtde_carimbo, celular FROM view_usuario_carimbo_campanha where data_cadastrou between '${datainicionew}' and '${datafimnew}' and  id_empresa = ${id_empresa} AND ${campanha} AND name like'%${name}%';`)

                console.log("1")
                console.log(`SELECT id_campanha, id_empresa, name, email, data_cadastrou, nome_campanha, qtde_carimbo, celular FROM view_usuario_carimbo_campanha where data_cadastrou between '${format(datainicio, 'yyyy-MM-dd')}' and '${format(datafim, 'yyyy-MM-dd')}' and id_empresa = ${id_empresa} AND ${campanha} AND name like'%${name}%';`)
                resultado = await prismaClient.$queryRawUnsafe (`SELECT id_campanha, id_empresa, name, email, data_cadastrou, nome_campanha, qtde_carimbo, celular FROM view_usuario_carimbo_campanha where data_cadastrou between '${format(datainicio, 'yyyy-MM-dd')}' and '${format(datafim, 'yyyy-MM-dd')}' and id_empresa = ${id_empresa} AND ${campanha} AND name like'%${name}%';`)
             
                }else{
                    
                    console.log("2")
                 resultado = await prismaClient.$queryRaw `SELECT id_campanha, id_empresa, name, email, data_cadastrou, nome_campanha, qtde_carimbo, celular FROM view_usuario_carimbo_campanha where data_cadastrou between'${format(datainicio, 'yyyy-MM-dd')}' and'${format(datafim, 'yyyy-MM-dd')}' and id_empresa = ${id_empresa}`
             
            }
                       
        return({status : true, resultado : resultado})
            
        }catch(error){
            console.log(error)
       
            return({status : false})
        }

        }
    }


   


export { ClienteService }