import SideBar from '../components/SideBar'
import '../styles/home.css'
import { useUserData } from '../hooks/useUserData'
import LoadingMain from '../components/LoadingMain'
import { useSearchParams } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

export default function Home () {
  const { userData } = useUserData(null)
  const [searchParams] = useSearchParams()

  const isAdmin = userData?.role === 'Administrador'

  const page = searchParams.get('page')

  if (!userData) return (<LoadingMain />)

  return (
    <main className='Home'>
      <SideBar userName={userData.name} userRole={userData.role} isAdmin={isAdmin} />
      <section className='content'>
        {page && <h1>{page}</h1>}
        {page === 'Registrar Usuario' && isAdmin && <RegisterForm />}
      </section>
    </main>
  )
}
