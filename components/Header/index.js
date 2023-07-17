import styles from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import useWindowSize from '../../hooks/window-size'
import Button from '../Button'

/**
 * Header.
 * Según si es Mobile o no devuelve un icono + u otro + sumado a 'Agregar Película'.
 * En el Menu, Notification y User puse solo la imagen ya que no contenían ninguna funcionalidad.
 */
export default function Header({ isModalOpen, setIsModalOpen }) {
  const { isMobile } = useWindowSize();

  return (
    <header className={`${styles.header} ${isMobile && isModalOpen? styles.withBackground : ''}`}>
      {isMobile && <Button className={`${styles.agregarButton} ${isMobile && !isModalOpen? styles.visible : styles.hidden}`} onClick={() => setIsModalOpen(true)} image={{ src: "/images/plusWithEllipse.svg", height: 36, width: 36, alt: "Plus With Ellipse" }} />}
      <div className={styles.leftContainer}>
        <Link href="/">
          <Image
            src="/images/liteflix.svg"
            className={styles.logo}
            height={isMobile ? 28 : 34}
            width={isMobile ? 98 : 113}
            alt="Liteflix"
          />
        </Link>
        {!isMobile && <Button className={styles.agregarButton} onClick={() => setIsModalOpen(true)} image={{ src: "/images/plus.svg", height: 14, width: 14, alt: "Plus", className: styles.plus }} text="Agregar película" />}
      </div>
      <div className={styles.rightContainer}>
        {!isMobile && (
          <>
            <Image
              src="/images/menu.svg"
              height={12}
              width={27}
              alt="Menu"
              className={styles.menu}
            />
            <Image
              src="/images/notification.svg"
              height={26}
              width={26}
              alt="Notificación"
              className={styles.notification}
            />
          </>
        )}
        <Image
          src="/images/user.svg"
          height={40}
          width={40}
          alt="Usuario"
          className={styles.user}
        />
      </div>
    </header>
  )
}
