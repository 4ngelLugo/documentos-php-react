import { useGetRoles } from '../hooks/useGetRoles'
import '../styles/signin.css'

export default function RegisterForm() {
  const { roles } = useGetRoles()

  return (
    <>
      <form className='register_form'>
        <article className='register_form-container'>
          <div className='register_form-input_div'>
            <label htmlFor='id'>Identificación</label>
            <input type='text' id='id' name='id' placeholder='Identificación' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' id='name' name='name' placeholder='Nombre' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='surname'>Apellido</label>
            <input type='text' id='surname' name='surname' placeholder='Apellido' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='email'>Correo Electrónico</label>
            <input type='mail' id='email' name='email' placeholder='Correo Electrónico' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='phone'>Télefono</label>
            <input type='tel' id='phone' name='phone' placeholder='Télefono' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='role'>Rol</label>
            <select name="role" id="role" defaultValue={'#'}>
              <option value="#" disabled>Seleccione un rol</option>
              {roles && (
                roles.map((role, index) => (
                  <option key={index} value={role.rolId}>{role.rolNombre}</option>
                ))
              )}
            </select>
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' id='password' name='password' placeholder='Contraseña' />
          </div>

          <div className='register_form-input_div'>
            <label htmlFor='confPassword'>Confirmar contraseña</label>
            <input type='password' id='confPassword' name='confPassword' placeholder='Confirmar contraseña' />
          </div>
        </article>

        <button className='register_form-button' type='submit'>Registrar usuario</button>
      </form>
    </>
  )
}