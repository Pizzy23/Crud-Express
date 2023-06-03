const fs = require("fs");
const path = require("path");

function redirecionarParaController(req, res, next, pastaControladores) {
  
  const rotas = {};
  fs.readdirSync(pastaControladores).forEach((arquivo) => {
    if (arquivo.endsWith(".js")) {
      const controlador = require(path.join(pastaControladores, arquivo));
      const nomeRota = arquivo.replace(".js", "");
      rotas[`/${nomeRota}`] = controlador;
    }
  });

  const rota = req.path;
  const controller = rotas[rota];
  if (!controller) {
    res.status(404).send("Rota não encontrada");
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        controller.get(req, res, next);
        break;
      case "POST":
        controller.post(req, res, next);
        break;
      case "PUT":
        controller.put(req, res, next);
        break;
      case "DELETE":
        controller.delete(req, res, next);
        break;
      default:
        res.status(405).send("Método não permitido");
        break;
    }
  } catch (error) {
    res.status(500).send("Erro ao processar a rota");
  }
}

module.exports = redirecionarParaController;
