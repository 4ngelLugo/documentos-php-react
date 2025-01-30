import '../styles/sidebar.css'
import defaultUserPfp from '../assets/pictures/user.png'
import { useUserData } from '../hooks/useUserData'
import LogOutButton from './LogOutButton'

export default function SideBar() {
  const { userData } = useUserData(null)


  if (!userData) return (<p>Cargando...</p>)

  return (
    <aside className='sidebar'>
      <div>
        <div className='close'>
          <span>X</span>
        </div>
        <section className='user_info'>
          <div className='user_pfp'>
            <img src={defaultUserPfp} width='100px' />
          </div>
          <h2 className='user_name'>{userData.name}</h2>
          <p className='user_role'>{userData.role}</p>
        </section>
      </div>
      <LogOutButton />
    </aside>
  )
}
