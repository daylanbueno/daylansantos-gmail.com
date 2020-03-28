import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logonImg from "../../assets/logo.svg";
import "./styles.css";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

const Incident = () => {
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("/incidentes", data, {
        headers: {
          Autorization: ongId
        }
      });
      history.push("/profile");
    } catch (error) {
      alert("Error, se persistir procure o administrador do sistema");
      console.log("descricao do error", error);
    }
  }

  return (
    <div className="incident-container">
      <section>
        <Link to="/">
          <img src={logonImg} alt="Be the Hero" />
        </Link>
        <h1>Cadastro</h1>
        <p>
          Descreva descreva um caso detalhadamente para encontrar um herói para
          resolver isso.
        </p>
        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#E02041" />
          Voltar para home
        </Link>
      </section>

      <form onSubmit={handleSave}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titulo do caso"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descrição"
        />
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Valor em reais"
        />

        <button className="button" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};
export default Incident;
