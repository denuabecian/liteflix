import styles from './InputFile.module.css'
import Button from '../Button'
import useWindowSize from '../../hooks/window-size'

/**
 * Input File y el Button para cargar la imagen de la película a agregar.
 */
export default function InputFile({ inputRef, onClick, onChange }) {
  const { isMobile } = useWindowSize()

  return (
    <>
      <Button type="button" className={styles.buttonFile} onClick={onClick} image={{ src: "/images/clip.svg", height: 16, width: 16, alt: "Clip" }} text={isMobile ? 'Agregá un archivo' : 'Agregá un archivo o arrastralo y soltalo aquí'} />
      <input ref={inputRef} name="poster" type="file" onChange={onChange} className={styles.inputFile} accept="image/png, image/jpeg, image/jpg" />
    </>
  )
}