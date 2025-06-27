export interface resgateProps{

    id_resgate : number
    id_campanha : number
    id_user : number
    id_user_realizou : number
    data_cadastrou : Date
    qtde_resgatado : number

}

export interface DataStoneProps {
    data:[
    cpf: string,
    name : string, 
    addresses:[
        {
            type: string,
            street: string,
            number: string,
            complement : string,
            neighborhood: string,
            city : string,
            district: string,
            postal_code: 19800072,
            priority: number
        }
    ]
]

}
export interface UsuarioProps {
    id_usuario: number
    id_user : number
    cpf : string
    nome: string
    email : string
    endereco : string,
    bairro : string,
    tipo: string,
    cidade : string,
    postalcode : string
    celular? : string
    data_cadastrou? : Date
    ativo : number
}

export interface CPFProps{
    cpf : string
}



export interface  EmpresaCadastrouProps {

    nome_empresa : string
    id_user: number
    cnpj : string
}

export interface  EmpresaProps {
    id_empresa : number
    nome_empresa : string
    id_user: number
    cnpj: string
    data_cadastrou: Date
    ativo : number
}

export interface CampanhaProps {
    id_campanha ? : number
    id_empresa: number
    nome_campanha: string
    data_inicio : Date
    data_fim : Date
    ativo ? : number
    qtde_servico : number
    descricao : string
    id_user ? : number
    gera_token? : number
    nro_campanha_cliente? : string
    qtde_token ? : number
    qtde_pontos? : number
    id_campanha_msg? : number
    mensagem_cliente? : string
}

export interface CarimboProps {
    id_carimbo? : number
    id_user_carimbou : number
    cpf : string 
    id_campanha : number
    data_carimbo? : Date
    id_resgate ? : number
    qtde_carimbo ? : number

}