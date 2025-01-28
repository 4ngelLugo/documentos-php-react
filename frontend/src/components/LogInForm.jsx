import { useState } from 'react'
import imagotipo from '../assets/imagotipo.svg'
import { useNavigate } from 'react-router-dom'

export default function LogInForm() {
  const [alertMessage, setAlertMessage] = useState()
  const [alertType, setAlertType] = useState()
  const navigate = useNavigate()

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

    fetch('http://localhost/backend/login.php', {
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

            case 'invalid credentials':
              showAlert('Credenciales inválidas', 'errorAlert')
              break
          }
        } else if (response.success) {
          showAlert('Inicio de sesión exitoso', 'successAlert')
          setTimeout(() => {
            navigate('/home')
          }, 1000)
        }
      })
      .catch((error) => {
        showAlert(`Error en la solicitud: ${error.message}`, 'errorAlert')
      })
  }

  return (
    <>
      <form className='login_form' onSubmit={handleSubmit}>
        <div className='logo_div'>
          <img src={imagotipo} alt='React logo' />
        </div>

        <div className='login_form-input_div'>
          <label htmlFor='id'>Identificación</label>
          <input type='text' id='id' name='id' placeholder='Identificación' />
        </div>

        <div className='login_form-input_div'>
          <label htmlFor='password'>Contraseña</label>
          <input type='password' id='password' name='password' placeholder='Contraseña' />
        </div>

        <button className='login_form-button' type='submit'>Iniciar Sesión</button>
      </form>

      <div className={`login_form-alert ${alertType}`}>{alertMessage}</div>
    </>
  )
}
