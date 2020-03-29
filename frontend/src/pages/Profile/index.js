/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

import api from "../../services/api";
import { formataMoeda } from "../../util/Formatador";

const Profile = () => {
  const history = useHistory();
  const nameOng = localStorage.getItem("ongName");
  const idOng = localStorage.getItem("ongId");
  const [incidents, setIncidents] = useState([]);

  async function handleFindAllIncident() {
    try {
      const response = await api.get("/profile", {
        headers: {
          Authorization: idOng
        }
      });
      setIncidents(response.data);
    } catch (response) {
      const { data } = response;
      toast.error(data);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  function handleDeleteIncident(id) {
    api
      .delete(`incidentes/${id}`, {
        headers: {
          Autorization: idOng
        }
      })
      .then(response => {
        handleFindAllIncident();
      })
      .catch(error => {
        alert(
          "Error, se o problema persistir procure o administrado do sistema"
        );
      });
  }

  useEffect(() => {
    handleFindAllIncident();
  }, []);

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {nameOng}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(item => (
          <li key={item.id}>
            <strong>CASO</strong>
            <p>{item.title}</p>

            <strong>DESCRICAO</strong>
            <p>{item.description}</p>

            <strong>Valor</strong>
            <p> {formataMoeda(item.value)}</p>
            <button onClick={() => handleDeleteIncident(item.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
