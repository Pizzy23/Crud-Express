const express = require("express");
const app = express();
const redirecionarParaController = require("./util/controllerMagic");
const pastaControladores = `${__dirname}\\controllers`;

app.use((req, res, next) => {
  redirecionarParaController(req, res, next, pastaControladores);
});

app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});
app.use((erro, req, res, next) => {
  res.status(erro.status || 500);
  return res.send({
    erro: {
      mensagem: erro.mensagem,
    },
  });
});

module.exports = app;
