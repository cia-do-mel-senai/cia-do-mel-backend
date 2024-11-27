import cors from "cors";
import express from "express";
import UsuariosController from "./Controllers/UsuariosController.js";
import AutenticacaoController from "./Controllers/AutenticacaoController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const usuariosController = new UsuariosController();

app.get("/usuarios", usuariosController.listar);
app.post("/usuarios", usuariosController.cadastrar);

const autenticacaoController = new AutenticacaoController();

app.post("/logar", autenticacaoController.logar);

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
