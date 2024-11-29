import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutosController {
  async cadastrar(req, resp) {
    try {
      const novoProduto = req.body;
      console.log(novoProduto);
      if (
        !novoProduto.nome ||
        !novoProduto.descricao ||
        !novoProduto.preco ||
        !novoProduto.imagem
      ) {
        resp.status(400).send("Os campos precisam ser preenchidos");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO produto (nome_produto, descricao_produto, preco_produto, imagem_produto) VALUES (?, ?, ?, ?);";

      const [resultado] = await conexao.execute(comandoSql, [
        novoProduto.nome,
        novoProduto.descricao,
        novoProduto.preco,
        novoProduto.imagem,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async listar(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM produto;";
      const [resposta] = await conexao.execute(comandoSql);
      resp.send(resposta);
      return resposta;
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ProdutosController;
