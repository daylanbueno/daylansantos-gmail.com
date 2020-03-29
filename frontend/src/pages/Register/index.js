import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";

import logonImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import InputMask from "react-input-mask";

import api from "../../services/api";
import { removeMaskPhone } from "../../util/Formatador";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [idOng, setIdOng] = useState("");

  function limparCampos() {
    setName("");
    setEmail("");
    setWhatsapp("");
    setCity("");
    setUf("");
  }

  async function hadleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp: removeMaskPhone(whatsapp),
      city,
      uf
    };

    try {
      const response = await api.post("ongs", data);
      setIdOng(response.data.id);
      limparCampos();
    } catch (responseError) {
      const { data } = responseError.response;
      console.log(data);
      toast.error(data.error);
    }
  }

  const ShowIdONG = () => <h1>{`SEU ID É: ${idOng}`}</h1>;

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <Link to="/">
            <img src={logonImg} alt="Be The Hero" />
          </Link>
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas e encontrarem
            os casos da sua ONG
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Efetuar Login
          </Link>
        </section>

        <form onSubmit={hadleRegister}>
          {idOng && ShowIdONG()}
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <InputMask
            placeholder="Whatsapp"
            mask="(99) 99999-9999"
            onChange={e => setWhatsapp(e.target.value)}
            value={whatsapp}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
