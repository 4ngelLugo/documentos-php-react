import SideBar from '../components/SideBar'
import '../styles/home.css'
import isotipo from '../assets/isotipo.svg'
import { useUserData } from '../hooks/useUserData'
import LoadingMain from '../components/LoadingMain'

export default function Home() {
  const { userData } = useUserData(null)

  if (!userData) return (<LoadingMain />)

  return (
    <main className='Home'>
      <SideBar userName={userData.name} userRole={userData.role} />
      <section className='content'>
        <img src={isotipo} alt='isotipo por defecto' width='80px' />
        <h1>Home</h1>
      </section>
    </main>
  )
}
