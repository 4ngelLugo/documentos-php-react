import SideBar from '../components/SideBar'
import '../styles/home.css'
import { useUserData } from '../hooks/useUserData'
import LoadingMain from '../components/LoadingMain'
import { useSearchParams } from 'react-router-dom'

export default function Home () {
  const { userData } = useUserData(null)
  const [searchParams] = useSearchParams()

  const page = searchParams.get('page')

  if (!userData) return (<LoadingMain />)

  return (
    <main className='Home'>
      <SideBar userName={userData.name} userRole={userData.role} />
      <section className='content'>
        {page && <h1>{page}</h1>}
      </section>
    </main>
  )
}
