import '../styles/sidebar.css'
import defaultUserPfp from '../assets/pictures/user.png'
import LogOutButton from './LogOutButton'

export default function SideBar({ userName, userRole }) {

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
          <h2 className='user_name'>{userName}</h2>
          <p className='user_role'>{userRole}</p>
        </section>
      </div>
      <LogOutButton />
    </aside>
  )
}
