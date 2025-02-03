import { useNavigate } from 'react-router-dom'

export default function LogOutButton () {
  const navigate = useNavigate()

  const CLOSE_SESSION_URL = 'http://localhost/backend/closeSession.php'

  const handleClick = () => {
    fetch(CLOSE_SESSION_URL, {
      method: 'POST',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.session) {
          navigate('/')
        }
      })
  }

  return (
    <button className='logOutBtn' onClick={handleClick}>Cerrar Sesión</button>
  )
}
