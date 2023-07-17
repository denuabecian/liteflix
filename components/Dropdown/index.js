import { useState } from 'react'
import styles from './Dropdown.module.css'
import Image from 'next/image'
import Button from '../Button'

/**
 * Dropdown que permite al usuario seleccionar las películas populares o ver la sección de 'Mis Películas'.
 */
export default function Dropdown({ setDropdownOption, dropdownOption, dropdownItems }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleOnClick = (item) => {
    setDropdownOption(item)
    setIsDropdownOpen(false)
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.optionSelected}>
        <span>Ver: </span><strong>{dropdownOption?.label}</strong>
        <Button className={`${styles.arrow} ${isDropdownOpen ? styles.open : styles.closed}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} image={{ src: "/images/arrow.svg", height: 8, width: 13, alt: "Arrow" }} />
      </div>
      <div className={`${styles.content} ${isDropdownOpen ? styles.visible : styles.hidden}`}>
        {dropdownItems.map(item => {
          return (
            <div key={`dropdown-${item.id}`} className={styles.option}>
              <Button className={styles.optionButton} onClick={() => handleOnClick(item)} text={item.label} />
              {dropdownOption.id === item.id && <Image src="/images/checked.svg" height={8} width={12} alt="Checked" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
