import cors from "cors";
import express from "express";
import UsuariosController from "./Controllers/UsuariosController.js";
import AutenticacaoController from "./Controllers/AutenticacaoController.js";
import ProdutosController from "./Controllers/ProdutosController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const usuariosController = new UsuariosController();

app.get("/usuarios", usuariosController.listar);
app.post("/usuarios", usuariosController.cadastrar);

const autenticacaoController = new AutenticacaoController();

app.post("/logar", autenticacaoController.logar);

const produtosController = new ProdutosController();

app.post("/produtos", produtosController.cadastrar);
app.get("/produtos", produtosController.listar);
app.get("/produtos/:id", produtosController.buscarProduto);
app.delete("/produtos/:id", produtosController.excluir);
app.put("/produtos", produtosController.editar);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
