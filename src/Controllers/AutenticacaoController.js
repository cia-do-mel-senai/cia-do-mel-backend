import ConexaoMySql from "../database/ConexaoMySql.js";

class AutenticacaoController {
  async logar(req, resp) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        resp.status(400).json({
          sucesso: false,
          mensagem: "Por favor, preencha todos os campos.",
        });
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "SELECT * FROM usuario WHERE email_usuario = ? AND senha_usuario = MD5(?)";

      const [resultado] = await conexao.execute(comandoSql, [email, senha]);

      console.log(resultado);

      const usuarioEncontrado = resultado[0];

      if (!usuarioEncontrado) {
        resp
          .status(401)
          .json({ sucesso: false, mensagem: "Usuário ou senha inválidos." });
        return;
      }

      delete usuarioEncontrado.senha_usuario;

      resp.status(200).json({
        sucesso: true,
        mensagem: "Login bem-sucedido",
        usuario: usuarioEncontrado,
      });
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default AutenticacaoController;
