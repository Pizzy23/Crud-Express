const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./controllers/homepageController"));
app.use("/register", require("./controllers/registerController"));
app.use("/login", require("./controllers/loginController"));

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
