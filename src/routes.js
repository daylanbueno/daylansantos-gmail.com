const express = require("express");
const routes = express.Router();

const ongcontroller = require("./controllers/OngController");
const incidenteController = require("./controllers/IncidenteController");
const profileController = require("./controllers/ProfileController");

routes.post("/ongs", ongcontroller.create);
routes.get("/ongs", ongcontroller.index);

routes.post("/incidentes", incidenteController.create);
routes.get("/incidentes", incidenteController.index);
routes.delete("/incidentes/:id", incidenteController.delete);

routes.get("/profile", profileController.index);

module.exports = routes;
