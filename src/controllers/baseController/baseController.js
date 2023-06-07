const { Headers } = require("../../util/headersClear");

class BaseController {
  constructor(clear) {
    this.clear = new Headers();
  }

  validateInput(data) {
    try{
    this.clear(data);
    return this.clear()
  }catch(e){
    res.send(e).status(500)
  }
}

  handleErrors(error) {
    // Manipula erros comuns que podem ocorrer durante o processamento
    // Pode realizar o registro de erros ou fornecer uma resposta adequada ao cliente
  }

  authenticateUser(req) {
    // Realiza a autenticação do usuário com base na requisição recebida
    // Pode retornar informações sobre o usuário autenticado ou lançar uma exceção em caso de falha na autenticação
  }

  authorizeUser(req) {
    // Verifica se o usuário possui autorização para acessar determinada rota com base na requisição recebida
    // Pode lançar uma exceção ou retornar uma resposta de acesso negado em caso de autorização insuficiente
  }
}

module.exports = { BaseController };
