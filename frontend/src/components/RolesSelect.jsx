import { useState, useRef, useEffect } from 'react'
import { useGetRoles } from '../hooks/useGetRoles'

export default function RolesSelect () {
  const { roles } = useGetRoles()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Seleccione un rol')
  const [inputValue, setInputValue] = useState('')
  const dropdownRef = useRef(null)
  const listRef = useRef(null)
  const [listHeight, setListHeight] = useState(0)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen && listRef.current) {
      setListHeight(listRef.current.scrollHeight)
    } else {
      setListHeight(0)
    }
  }

  const handleSelect = (role) => {
    setSelected(role.rolNombre)
    setInputValue(role.rolId)
    setIsOpen(false)
    setListHeight(0)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setListHeight(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='register_form-input_div' ref={dropdownRef}>
      <label htmlFor='role'>Rol</label>
      <div
        className={`register_form-select ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
        role='button'
        tabIndex='0'
      >
        {selected}

        <ul
          ref={listRef}
          className='register_form-select-options_list'
          style={{
            height: `${listHeight}px`,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
          }}
        >
          {roles && roles.map((role) => (
            <li
              key={role.rolId}
              className='register_form-option'
              onClick={() => handleSelect(role)}
            >
              {role.rolNombre}
            </li>
          ))}
        </ul>

        <input type='hidden' name='role' value={inputValue} />
      </div>
    </div>
  )
}
