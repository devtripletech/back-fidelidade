import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController"
import { ListUser } from "./controllers/user/ListUserController"
import { EmpresaController } from "./controllers/empresa/EmpresaController"
import { CampanhaController } from "./controllers/campanha/CampanhaController"
import { isAuth } from "./middlewares/isAuth";
import { CarimboController } from "./controllers/carimbo/CarimboController";
import { UsuarioController } from "./controllers/usuario/UsuarioController";
import { UserEmpresaController } from "./controllers/user/UserEmpresaController";

import PainelClienteController from "./controllers/painel-cliente/PainelClienteController";
import { ResgateController } from "./controllers/resgate/ResgateController";
import { ClientesContrller } from "./controllers/clientes/ClientesController";
import { CategoriaController } from "./controllers/categoria/CategoriaController";
import { ProdutoController } from "./controllers/produto/ProdutoController";
import { ListaProdutoController } from "./controllers/produto/lista/ListaProdutoController";
import { PedidoController } from "./controllers/pedido/PedidoController";
import { Whats } from "./controllers/whatsapp/WhatsAppController";
import { CrmController } from "./controllers/crm/CrmController";
import { BuscaClienteController } from "./controllers/buscacliente/BuscaClienteController";
import { isAuthApiKey } from "./middlewares/isAuthApiKey";
import { RelatoriosConsultaController } from "./controllers/buscacliente/RelatoriosConsultaController";

const router= Router();

//--ROTAS URSERS 
router.post("/user", new CreateUserController().handle)
router.get("/user", new ListUser().handle)
router.get("/userfind/:id_user", new ListUser().findUsuario_id)
router.post("/login", new AuthUserController().handle)


router.post("/pedido", new PedidoController().inserePedido)

router.put("/usuarioatualiza/:cpf", new UsuarioController().UpdateUsuarioEmail)

// -- Rotas empresa
router.post("/empresa", new EmpresaController().createEmpresa)
router.get("/empresa", new EmpresaController().listEmpresa)
router.get("/empresauser", new EmpresaController().listEmpresauserId)
router.post("/userempresa", new UserEmpresaController().createUserEmpresa)
router.post("/userempresafunc", new UserEmpresaController().CreateFuncEmpresa)

//-- painel cliente
router.get("/painelcliente/:id_user" , new PainelClienteController().ListPainelController)

// -- Rotas campanha
router.post("/campanha", new CampanhaController().createCampanha)
router.post("/campanhaformulario", new CampanhaController().CampaFormulario)
router.get("/campanha/:id_empresa", new CampanhaController().ListCampanha)
router.get("/campanha", new CampanhaController().ListCampanhaQuery)
router.get("/resumocampanha", new CampanhaController().resumoCampanha)
router.put("/campanha", new CampanhaController().UpdateCampanha)
router.get("/campanhaextrato/:id_campanha/:id_user", new CampanhaController().ClienteExtrato)
//--campanha 
router.post("/campanhamsg", new CampanhaController().Campanha_msg)
router.get("/campanhamsg/:id_empresa", new CampanhaController().Campanha_msg_lista)
router.get("/campanhaedit/:id_campanha", new CampanhaController().ListaEditarCampanha)


router.get("/cliente",  new ClientesContrller().ClientesList)
router.get("/clientebonus/:id_empresa",  new ClientesContrller().BuscaClienteBonus)
router.get("/clienteqtdeempresa/:id_empresa",  new ClientesContrller().contagemClienteEmpresa)

router.post("/sendsms", new ClientesContrller().SendMensagemSMS)

//--Rotas Carimbo
router.post("/carimbo", new CarimboController().inserCarimbo)
router.get("/carimbocards/:id_empresa", new CarimboController().BuscaCarimboClienteMensalController)
router.post("/usuario/:cpf", new UsuarioController().UsuarioCheck)
//--resgate
router.get("/resgate/:id_empresa", new ResgateController().ListResgate)
router.get("/usuario/:cpf", new UsuarioController().UsuarioCheck)

//cmapnah cliente mobile 
router.get("/campanhausuario/:id_user",  new CampanhaController().CampanhaCliente)

//--usuario usado para buscar dados da api datastone
//router.get("/usuario/:cpf&:empresaId", new UsuarioController().UsuarioCheck)
router.get("/usuario/:cpf", new UsuarioController().UsuarioCheck)

//---consulta
router.post("/buscacliente" , isAuth, new BuscaClienteController().buscaCliente)
router.get("/buscaclienteapi" , isAuthApiKey, new BuscaClienteController().buscaClienteapi)
router.get("/rel_consulta_resumido/:id_user", new RelatoriosConsultaController().historicoConsulta)

//--categoria
router.get("/produto/:id_empresa", new ProdutoController().buscaProduto)
router.get("/produtocategoria/:id_categoria", new ProdutoController().produtoCategoria)
router.get("/categoria", new CategoriaController().CategoriaLista)

//--lista de produto
router.get("/listaempresa/:id_empresa", new ListaProdutoController().listaProduto)
router.get("/produtolista/:id_lista", new ListaProdutoController().produtosLista)
router.post("/lista", new ListaProdutoController().criarLista)
router.post("/produto/:id_empresa", new ProdutoController().criarProduto)
router.get('/listaid/:id_lista', new ListaProdutoController().listaList)
router.post('/listaprodutoinsere/:id_lista', new ListaProdutoController().insereProdutoLista)

router.get("/pedido_lista/:id_empresa", new PedidoController().listaPedido)
router.post("/whatsmensagem", new Whats().envia)

router.get("/totalvendas/:id_empresa", new CrmController().crmTotalVendas)

export {router}