const express = require("express");

const routes = express.Router();

routes.post("/ongs", (req, res) => {
  const { body } = req;
  console.log(body);
  return res.json({
    evento: "Oministack 11.0 ",
    aluno: "Dailan Bueno dos Santos"
  });
});

module.exports = routes;
