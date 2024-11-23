import cors from "cors";
import express from "express";
import UsuariosController from "./Controllers/UsuariosController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const usuariosController = new UsuariosController();

app.get("/usuarios", usuariosController.listar);

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
