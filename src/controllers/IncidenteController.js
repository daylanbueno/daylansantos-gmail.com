const connnection = require("../database/connection");
module.exports = {
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.autorization;
    const [id] = await connnection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });
    return res.json({ id });
  },

  async index(req, res) {
    const incidents = await connnection("incidents").select("*");
    return res.json(incidents);
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.autorization;

    const incident = await connnection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (!incident) {
      return res
        .status(400)
        .json({ error: "Registro não encontrado para exclusão!" });
    }
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: "Operação não permitida!" });
    }

    await connnection("incidents")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
