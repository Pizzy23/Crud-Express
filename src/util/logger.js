const fs = require('fs');

function logRequest(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  res.on('finish', () => {
    const statusCode = res.statusCode;
    const logMessage = `[${timestamp}] ${method} ${url} - ${statusCode}\n`;

    fs.appendFile('request.log', logMessage, (err) => {
      if (err) {
        console.error('Erro ao registrar a requisição:', err);
      }
    });
  });

  next();
}

module.exports = logRequest;
