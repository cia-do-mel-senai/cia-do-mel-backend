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
      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        resp
          .status(400)
          .json({ mensagem: "Todos os campos precisam ser preenchidos." });
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

      resp.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        // Exemplo para tratar erros de duplicidade
        resp.status(409).json({ mensagem: "E-mail já cadastrado." });
      } else {
        resp.status(500).json({ mensagem: "Erro interno do servidor." });
      }
    }
  }
}

export default UsuariosController;
