import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";

const Logon = () => {
  const history = useHistory();
  const [id, setId] = useState("");

  async function handleLogon(e) {
    e.preventDefault();
    const data = {
      id
    };
    try {
      const response = await api.post("session", data);
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="register">
            <FiLogIn size={16} color="#e02141" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
};
export default Logon;
