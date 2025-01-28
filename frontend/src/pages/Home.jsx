import SideBar from '../components/SideBar'
import '../styles/home.css'
import isotipo from '../assets/isotipo.svg'

export default function Home () {
  return (
    <main className='Home'>
      <SideBar />
      <section className='content'>
        <img src={isotipo} alt='isotipo por defecto' width='80px' />
        <h1>Home</h1>
      </section>
    </main>
  )
}
