import React from "react";
import { Link } from "react-router-dom";
import logonImg from "../../assets/logo.svg";
import "./styles.css";
import { FiArrowLeft } from "react-icons/fi";

const Incident = () => {
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

      <form>
        <input placeholder="Titulo do caso" />
        <textarea placeholder="Descrição" />
        <input placeholder="Valor em reais" />

        <button className="button" type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};
export default Incident;
