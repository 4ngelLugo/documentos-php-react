import { useEffect, useState } from 'react'
import '../styles/sidebar.css'
import defaultUserPfp from '../assets/pictures/user.png'

export default function SideBar () {
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
    <aside className='sidebar'>
      <div className='close'>
        <span>X</span>
      </div>
      <section className='user_info'>
        {userData &&
          <>
            <div className='user_pfp'>
              <img src={defaultUserPfp} width='100px' />
            </div>
            <h2 className='user_name'>{userData.name}</h2>
            <p className='user_role'>{userData.role}</p>
          </>}
      </section>
    </aside>
  )
}
