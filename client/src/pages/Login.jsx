import React, { useState } from "react";
import {Link} from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Inicia Sesion</h2>
        <form className="form login__form">
          <p className="form__error-message">Este es un Mensaje de Error</p>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn primary">Iniciar Sesion</button>
        </form>
        <small>No tienes una tienes una cuenta? <Link to="/register">Registrate aqui</Link></small>
      </div>
    </section>
  );
};

export default Login;
