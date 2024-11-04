import React, { useState } from 'react'
import Avatar from '../assets/avatar15.jpg';
import {Link} from 'react-router-dom';
import {FaCheck, FaEdit} from 'react-icons/fa';

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  return (
    <section className='profile'>
      <div className="container profile__container">
        <Link to={`/myposts/sdgr`} className='btn'>Mis Posteos</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            {/*Formulario para actualizar avatar*/}
            <form className='avatar__form'>
              <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg' />
              <label htmlFor="avatar"><FaEdit /></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck /></button>
          </div>

          <h1>Ernest Achiever</h1>

          {/* Formulario para actualizar los detalles de usuario */}
          <form className="form profile__form">
            <p className="form__error-message">Este es un mensaje de error</p>
            <input type="text" placeholder='Nombre Completo' value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Contraseña Actual' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder='Nueva Contraseña' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder='Confirmar Nueva Contraseña' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button type='submit' className='btn primary'>Actualizar Perfil</button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default UserProfile