import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SESSION_URL = 'http://localhost/backend/session.php'

export const useUserData = () => {
  const [userData, setUserData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function getUserData() {
      const response = await fetch(SESSION_URL, {
        method: 'POST',
        credentials: 'include'
      })
      const data = await response.json()
      if (data.error == 'no session') {
        navigate('/')
      } else {
        setUserData(data)
      }
    }

    getUserData()
  }, [navigate])

  return { userData }
}