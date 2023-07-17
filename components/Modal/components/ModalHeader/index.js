import styles from './ModalHeader.module.css'
import Image from 'next/image'
import Button from '../../../Button'

/**
 * Header del Modal. 
 * Dependiendo en qué paso de la carga de la película se encuentre, puede mostrar el título Agregar Película o el logo de Liteflix. 
 * Ambas posibilidades pueden tener o no la cruz dependiendo si es Mobile o no.
 */ 
const ModalHeader = ({ isMobile, step, onClose }) => {
  if (isMobile && step === 2) return null
  
  /**
   * Si no es Mobile y el step es 2 (es decir que se subió la película exitosamente) muestro el logo de Liteflix junto a la cruz que permite cerrar el Modal.
   * En caso de no ser Mobile y encontrarse en otro step muestro el título 'Agregar Película' junto a la cruz.
   */
  if (!isMobile) {
    if (step === 2) {
      return (
        <div className={styles.modalHeader}>
          <Button className={styles.modalClose} onClick={onClose} image={{ src: "/images/close.svg", height: 15, width: 15, alt: "Close" }} />
          <Image
            src="/images/liteflix.svg"
            className={styles.modalLogo}
            height={isMobile ? 28 : 34}
            width={isMobile ? 98 : 113}
            alt="Liteflix"
          />
        </div>
      )
    }

    return (
      <div className={styles.modalHeader}>
        <Button className={styles.modalClose} onClick={onClose} image={{ src: "/images/close.svg", height: 15, width: 15, alt: "Close" }} />
        <h3 className={styles.modalTitle}>Agregar Película</h3>
      </div>
    )
  }
  
  /**
   * Si es Mobile y el step es 0 o 1 solo muestro el título 'Agregar Película'.
   */
  return (
    <div className={styles.modalHeader}>
      <h3 className={styles.modalTitle}>Agregar Película</h3>
    </div>
  )
}

export default ModalHeader