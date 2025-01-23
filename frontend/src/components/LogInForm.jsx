import { useState } from 'react'

export default function LogInForm () {
  const [alertMessage, setAlertMessage] = useState()
  const [alertType, setAlertType] = useState()

  const showAlert = (alertMessage, alertType) => {
    setAlertMessage(alertMessage)
    setAlertType(alertType)
    setTimeout(() => {
      setAlertMessage('')
      setAlertType('')
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    fetch('http://localhost/backend/login.php', {
      method: 'POST',
      body: formData
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
        }
      })
  }

  return (
    <form action='' onSubmit={handleSubmit}>
      <div>
        <label htmlFor='id'>Identificación</label>
        <input type='text' id='id' name='id' placeholder='Identificación' />
      </div>
      <div>
        <label htmlFor='password'>Contraseña</label>
        <input type='password' id='password' name='password' placeholder='Contraseña' />
      </div>
      <button type='submit'>Iniciar Sesión</button>

      <div className={`alert ${alertType}`}>{alertMessage}</div>
    </form>
  )
}
