import ConexaoMySql from "../database/ConexaoMySql.js";
class UsuariosController {
  async listar(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM usuario;";

      const [resposta] = await conexao.execute(comandoSql);
      resp.send(resposta);
      return resposta;
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async cadastrar(req, resp) {
    try {
      const novoUsuario = req.body;
      console.log(novoUsuario);
      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        resp.status(400).send("Os campos precisam ser preenchidos");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario) VALUES (?, ?, md5(?));";

      const [resultado] = await conexao.execute(comandoSql, [
        novoUsuario.nome,
        novoUsuario.email,
        novoUsuario.senha,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default UsuariosController;
