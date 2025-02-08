import { useState } from 'react'
import { useGetRoles } from '../hooks/useGetRoles'
import '../styles/signin.css'

export default function RegisterForm () {
  const [alertMessage, setAlertMessage] = useState()
  const [alertType, setAlertType] = useState()
  const { roles } = useGetRoles()

  const LOGIN_PREFIX_URL = 'http://localhost/backend/signin.php'

  const showAlert = (alertMessage, alertType) => {
    setAlertMessage(alertMessage)
    setAlertType(alertType)
    setTimeout(() => {
      setAlertType('')
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    fetch(LOGIN_PREFIX_URL, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          switch (response.error) {
            case 'invalid method':
              showAlert('Método HTTP no permitido', 'errorAlert')
              break

            case 'empty fields':
              showAlert('Por favor, llena ambos campos', 'errorAlert')
              break

            case 'user already exist':
              showAlert('Existe un usuario con la misma identificación', 'errorAlert')
              break

            case 'register error':
              showAlert('Ocurrio en error al registrar el usuario', 'errorAlert')
              break
          }
        } else if (response.success) {
          showAlert('Registro de usuario exitoso', 'successAlert')
        }
      })
      .catch((error) => {
        console.log(error.message)
        showAlert('Error en la solicitud', 'errorAlert')
      })
  }

  return (
    <>
      <form className='register_form' onSubmit={handleSubmit} encType='multipart/form-data'>
        <article className='register_form-container'>
          <div className='register_form-input_div'>
            <label htmlFor='id'>Identificación</label>
            <input type='text' id='id' name='id' placeholder='Identificación' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' id='name' name='name' placeholder='Nombre' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='surname'>Apellido</label>
            <input type='text' id='surname' name='surname' placeholder='Apellido' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='email'>Correo Electrónico</label>
            <input type='mail' id='email' name='email' placeholder='Correo Electrónico' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='phone'>Télefono</label>
            <input type='tel' id='phone' name='phone' placeholder='Télefono' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' id='password' name='password' placeholder='Contraseña' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='role'>Rol</label>
            <select name='role' id='role' defaultValue='#'>
              <option value='#' disabled>Seleccione un rol</option>
              {roles && (
                roles.map((role, index) => (
                  <option key={index} value={role.rolId}>{role.rolNombre}</option>
                ))
              )}
            </select>
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='image'>Imagen de perfil</label>
            <input type='file' id='image' name='image' />
          </div>
        </article>

        <button className='register_form-button' type='submit'>Registrar usuario</button>
      </form>

      <div className={`signin_form-alert ${alertType}`}>{alertMessage}</div>
    </>
  )
}
