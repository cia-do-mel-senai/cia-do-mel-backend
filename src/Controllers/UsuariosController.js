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
}

export default UsuariosController;
