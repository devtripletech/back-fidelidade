import e, { Request, Response } from "express";
import { CamapanhaService } from "../../services/campanha/CampanhaService";


interface EmpresaProps{
    id_empresa :number
}

class CampanhaController{

    async CampanhaCliente(req: Request, res : Response){

        const id_user = req.params.id_user
        const campanhaService = new CamapanhaService()

        const result = await campanhaService.campanhaCliente({id_user})

        if(result.status == true){
            
            res.json({status: true, resultado : result.resultado})
            res.status(200)
        }else{

            res.json({status: false})
            res.status(400)
        }

    }

    async Campanha_msg_lista(req : Request, res : Response){

        const id_empresa = +req.params.id_empresa
        const campanhaService = new CamapanhaService()
        const result = await campanhaService.campanha_msg_lista({id_empresa})

        if(result.status == true){

            res.status(200)
            res.json({ status : true, resultado : result.resultado})

        }else{

            res.status(400)
            res.json({ status : false})
        }

    }
    
    async Campanha_msg(req : Request, res : Response){

        const {mensagem, id_empresa, id_user, nome} = req.body

        const campanhaService = new CamapanhaService()

        const result = await campanhaService.campanha_msg({mensagem, id_empresa, id_user, nome})

        if(result.status == true){

            res.status(200)
            res.json({ status : true, mensagem : "Criado com sucesso"})

        }else{

            res.status(400)
            res.json({ status : false})

        }

    }

    async ClienteExtrato (req : Request, res : Response){

        const id_campanha = req.params.id_campanha
        const id_user = req.params.id_user

        const campanhaService = new CamapanhaService()


        const result = await campanhaService.ClienteExtranho({id_campanha, id_user})

        if(result.status == true){
            res.status(200)
            res.json({ status : true, resultado : result.resultado})
        }
        else{

            res.status(400)
            res.json({ status : false})
        }




    }

    async CampaFormulario(req : Request, res : Response){

        const campanhaService = new CamapanhaService()

        const token = req.query.id
        const { nome, email, cpf, celular} =  req.body
        
        const resultado = await campanhaService.campaFormulario({token, nome, email, cpf, celular})


        if(resultado.status == true){

            res.status(200)
            res.json({ status : true, mensagem : "Token validado com sucesso!"})

        }else{

            res.status(400)
            res.json({ status : false, mensagem : "Token com problema!"})
        }

    }

    async resumoCampanha(req : Request, res : Response){

        const id_empresa = req.query.id_empresa
        const campanhaService = new CamapanhaService()

        
        const result = await campanhaService.resumoCamapnha(id_empresa)

        if(result.status == true){
            res.status(200)
            res.json({ status : true, resultado : result.resultado})
        }

    }

    async ListCampanha(req: Request, res : Response){
    
        const id_empresa  = (+req.params.id_empresa)

        const campanhaService = new CamapanhaService()

         const result  = await campanhaService.ListCampanhas(id_empresa)

        res.status(200)
        res.json({status : true, resultado : result.resultado})

        
    }   
    
    async ListCampanhaQuery(req: Request, res : Response){
    
        const id_empresa  = (+req.query.id_empresa)

        const campanhaService = new CamapanhaService()

         const result  = await campanhaService.ListCampanhas(id_empresa)

        res.status(200)
        res.json({status : true, resultado : result.resultado})

        
    }

    async UpdateCampanha (req: Request, res: Response){

        let {nome_campanha, data_inicio, data_fim, qtde_servico, id_empresa, descricao, id_user, id_campanha } = req.body
        const campanhaService = new CamapanhaService()

        let data_conv_ini = new Date(data_inicio)
        let data_conv_fim = new Date(data_fim)      
         
        data_inicio = data_conv_ini.toISOString()
        data_fim = data_conv_fim.toISOString()
        

        const result = await campanhaService.updateCampanha({nome_campanha, data_inicio, data_fim, qtde_servico, id_empresa, descricao, id_user, id_campanha})

        if(result.status == true){
            res.status(200)
            res.json({status : true, mensagem : "Campanha atualizada com sucesso!!!"})
        }else{
            res.status(400)
            res.json({status : false, mensagem : "Não foi possivel atualizar a campanha!!!"})
        }

    }
    async ListaEditarCampanha(req: Request, res : Response){

        const id_campanha = +req.params.id_campanha

        const campanhaService = new CamapanhaService()

        const result = await campanhaService.listaEditarCampanha({id_campanha})

        if(result.status == true){
            res.status(200)
            res.json({status : true, resultado : result.resultado})

        }else{

            res.status(400)
            res.json({status : false, mensagem : "Não foi possivel carregar a campanha"})
        }

    }


    async createCampanha(req : Request, res : Response){

        let {mensagem_cliente, nome_campanha, data_inicio, data_fim, qtde_servico, id_empresa, descricao, id_user, gera_token, nro_campanha_cliente, qtde_token, qtde_pontos, id_campanha_msg} = req.body

    
       const campanhaService = new CamapanhaService()       

       let data_conv_ini = new Date(data_inicio)
       let data_conv_fim = new Date(data_fim)      
        
       data_inicio = data_conv_ini.toISOString()
       data_fim = data_conv_fim.toISOString()
        
   

        const resultado = await campanhaService.createCampanha({mensagem_cliente, nome_campanha, data_inicio, data_fim, qtde_servico, id_empresa, descricao, id_user, gera_token, nro_campanha_cliente, qtde_token, qtde_pontos, id_campanha_msg})

        if(resultado.status == true){
            res.status(200)
            res.json({status : true, mensagem : "Campanha criada com sucesso"})
        }else{
            res.status(400)
            res.json({status : false, mensagem : "Não foi possivel criar a campanha"})
        }
    
                 
                   
        
    }
}

export {CampanhaController}