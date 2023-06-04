const fs = require("fs");
const path = require("path");

function redirecionarParaController(req, res, next, pastaControladores) {
  const rotas = {};
  percorrerDiretorioControladores(pastaControladores, rotas);

  const rota = req.path;
  const controller = rotas[rota];
  if (!controller) {
    res.status(404).send("Rota não encontrada");
    return;
  }

  try {
    const metodo = req.method.toLowerCase();
    if (controller[metodo]) {
      controller[metodo](req, res, next);
    } else {
      res.status(405).send("Método não permitido");
    }
  } catch (error) {
    res.status(500).send("Erro ao processar a rota");
  }
}

function percorrerDiretorioControladores(diretorio, rotas, prefixo = "") {
  const arquivos = fs.readdirSync(diretorio);

  arquivos.forEach((arquivo) => {
    const caminhoArquivo = path.join(diretorio, arquivo);
    const stats = fs.statSync(caminhoArquivo);

    if (stats.isDirectory()) {
      const novoPrefixo = path.join(prefixo, arquivo);
      percorrerDiretorioControladores(caminhoArquivo, rotas, novoPrefixo);
    } else if (stats.isFile() && arquivo.endsWith(".js")) {
      const controlador = require(caminhoArquivo);
      const nomeRota = obterNomeRota(controlador, arquivo);
      const rota = path.join(prefixo, nomeRota).toLowerCase();
      rotas[`/${rota}`] = controlador;
    }
  });
}

function obterNomeRota(controlador, arquivo) {
  const comentarioRota = controlador.toString().match(/@route\s+(.+)/);
  if (comentarioRota && comentarioRota.length > 1) {
    return comentarioRota[1].trim();
  }
  let nomeRota = arquivo.replace(".js", "");
  if (nomeRota.toLowerCase().endsWith("controller")) {
    nomeRota = nomeRota.slice(0, -10);
  }
  return nomeRota;
}

module.exports = redirecionarParaController;
