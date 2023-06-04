const express = require("express");
const app = express();
const magicController = require("./util/controllerMagic");
const folderController = `${__dirname}\\controllers`;

app.use((req, res, next) => {
  magicController(req, res, next, folderController);
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
