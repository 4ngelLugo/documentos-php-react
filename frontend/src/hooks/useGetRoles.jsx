import { useEffect, useState } from 'react'

const ROLES_PREFIX_URL = 'http://localhost/backend/roles.php'

export const useGetRoles = () => {
  const [roles, setRoles] = useState()

  useEffect(() => {
    async function getRoles () {
      const response = await fetch(ROLES_PREFIX_URL, {
        method: 'POST',
        credentials: 'include'
      })
      const data = await response.json()
      setRoles(data)
    }

    getRoles()
  }, [])

  return { roles }
}
