import LogInForm from '../components/LogInForm'
import imagotipo from '../assets/imagotipo.svg'
import './App.css'

export default function App () {
  return (
    <>
      <div>
        <img src={imagotipo} alt='React logo' />
      </div>
      <LogInForm />
    </>
  )
}
