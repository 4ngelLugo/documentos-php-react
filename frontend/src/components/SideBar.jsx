import { useEffect, useState } from "react"
import defaultUserPfp from '../assets/pictures/user.png'

export default function SideBar() {
  const [userData, setUserData] = useState()

  const getUserData = async () => {
    const response = await fetch('http://localhost/backend/session.php', {
      method: 'POST',
      credentials: 'include'
    })
    const data = await response.json()
    setUserData(data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <aside className="sidebar">
      <div className="close">
        X
      </div>
      <section className="user_info">
        {userData &&
          <>
            <img src={defaultUserPfp} width="100px" />
            <h2>{userData.name}</h2>
            <p>{userData.role}</p>
          </>
        }
      </section>
    </aside>
  )
}