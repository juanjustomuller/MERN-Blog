import React, { useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {UserContext} from '../context/userContext.js';
import axios from 'axios';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {setCurrentUser} = useContext(UserContext)

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData)
      const user = await response.data
      setCurrentUser(user)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Inicia Sesion</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
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
