import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutosController {
  async cadastrar(req, resp) {
    try {
      const novoProduto = req.body;
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
  async buscarProduto(req, resp) {
    try {
      const { id } = req.params;
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM produto WHERE id_produto = ?;";
      const [resposta] = await conexao.execute(comandoSql, [id]);
      resp.send(resposta);
      return resposta;
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async excluir(req, resp) {
    try {
      const { id } = req.params;
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM produto WHERE id_produto = ?;";
      const [resposta] = await conexao.execute(comandoSql, [id]);
      resp.send(resposta);
      return resposta;
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async editar(req, resp) {
    try {
      const produto = req.body;
      console.log(produto);
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "UPDATE produto SET nome_produto = ?, descricao_produto = ?, preco_produto = ?, imagem_produto = ? WHERE id_produto = ?";
      const [resposta] = await conexao.execute(comandoSql, [
        produto.nome_produto,
        produto.descricao_produto,
        produto.preco_produto,
        produto.imagem_produto,
        produto.id_produto,
      ]);
      resp.send(resposta);
      return resposta;
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async ultimosProdutos(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "SELECT * FROM produto ORDER BY id_produto DESC LIMIT 4;";
      const [resposta] = await conexao.execute(comandoSql);
      resp.send(resposta);
      return resposta;
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ProdutosController;
