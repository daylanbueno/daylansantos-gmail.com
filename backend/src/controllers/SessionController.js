const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { id } = request.body;
    if (!id) {
      return response.status(400).json({ error: "O ID da ONG é obrigatório!" });
    }
    const ong = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();
    if (!ong) {
      return response
        .status(400)
        .json({ error: "O ID  foi encontrado uma ong com o ID informado!" });
    }
    return response.json(ong);
  }
};
