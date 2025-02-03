import '../styles/sidebar.css'
import defaultUserPfp from '../assets/pictures/user.png'
import LogOutButton from './LogOutButton'
import PageOptions from '../components/PageOptions'

export default function SideBar ({ userName, userRole }) {
  return (
    <aside className='sidebar'>
      <div className='content_sidebar'>
        {/* <div className='close'>
          <span>X</span>
        </div> */}
        <section className='user_info'>
          <div className='user_pfp'>
            <img src={defaultUserPfp} width='100px' />
          </div>
          <h2 className='user_name'>{userName}</h2>
          <p className='user_role'>{userRole}</p>
        </section>
        <PageOptions isAdmin={userRole === 'Administrador' && true} />
      </div>
      <LogOutButton />
    </aside>
  )
}
