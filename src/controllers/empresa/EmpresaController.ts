import { Request, Response } from "express";
import { EmpresaService } from "../../services/empresa/EmpresaService";

class EmpresaController {


    async createEmpresa(req :Request, res : Response){

        const {nome_empresa, id_user, cnpj } = req.body;

        const empresaService = new EmpresaService()

        const result = await empresaService.create({nome_empresa, id_user, cnpj})

        if(result.status == true) {
        
            res.json({ mensagem: "Empresa criada com sucesso", status: true })
            res.status(200)
        }else{
            res.json({ mensagem: "Erro ao criar empresa", status: false })
            res.status(400)

        }

    }

    async listEmpresa(req :Request, res : Response){

        const empresaService = new EmpresaService()
        const result = await empresaService.listEmpresa()

        if(result.status == true){
            res.json({status: true, resultado: result.result})
        }

    }

    async listEmpresauserId(req :Request, res : Response){

        const empresaService = new EmpresaService()

        let id_user = Number(req.query.id_user);

        const result = await empresaService.listEmpresaUserId(id_user) 

        if(result.status == true){
            res.json({status: true, resultado: result.result})
        }

    }

    

}

export { EmpresaController }