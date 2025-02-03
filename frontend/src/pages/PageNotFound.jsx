import imagotipo from '../assets/imagotipo.svg'
import '../styles/pageNotFound.css'

export default function PageNotFound () {
  return (
    <div className='pageNotFound-container'>
      <header className='pageNotFound-header'>
        <img src={imagotipo} alt='Logo por defecto' />
      </header>

      <main className='pageNotFound-main'>
        <p className='pageNotFound-errorTitle'>404</p>
        <span className='pageNotFound-errorDesc'>Page not found</span>
      </main>
    </div>
  )
}
