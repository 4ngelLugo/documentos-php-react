import { useSearchParams } from 'react-router-dom'

export default function PageOptions ({ isAdmin }) {
  const PAGES_NAMES = ['Directorio', 'Documentos', 'Usuarios', 'Inventario', 'Registrar Usuario']

  const [, setSearchParams] = useSearchParams()

  const handleClick = (toPage) => {
    setSearchParams({ page: toPage })
  }

  return (
    <section className='pageOptions'>
      {PAGES_NAMES.map((page, index) => {
        if (page === 'Registrar Usuario' && !isAdmin) return null

        return (
          <PageOptionCard
            onClick={() => handleClick(page)}
            key={index}
            optionName={page}
          />
        )
      })}
    </section>
  )
}

function PageOptionCard ({ optionName, onClick }) {
  return (
    <article className='pageOptionCard' onClick={onClick}>
      <span>{optionName}</span>
    </article>
  )
}
