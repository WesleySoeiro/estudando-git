import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErrosValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const menssagemErro = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    console.log(erro.errors);
    super(`A requisição falhou devido ao erro -> ${menssagemErro}`);
  }
}

export default ErrosValidacao;
