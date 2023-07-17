import { useRef, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import useWindowSize from '../../hooks/window-size'
import ModalHeader from './components/ModalHeader'
import UploadFile from './components/UploadFile'
import Button from '../Button'
import styles from './Modal.module.css'
import addFilm from '../../pages/api/addFilm'

/**
 * Modal que permite agregar una película.
 */
export default function Modal({ isModalOpen, setIsModalOpen, refetch }) {
  const { isMobile } = useWindowSize()
  /**
   * Los steps del Modal están separados entre la posibilidad de seleccionar un archivo (0), el ProgressBar con el porcentaje de su carga (1) y el mensaje de película subida a la base (2).
   */
  const [step, setStep] = useState(0)
  /**
   * Porcentaje del ProgressBar que indica el estado de la carga de la imagen.
   */
  const [progressBarPercentage, setProgressBarPercentage] = useState("0%")
  /**
   * Datos de la película nueva
   */
  const [filmPoster, setFilmPoster] = useState('')
  const [filmTitle, setFilmTitle] = useState('')
  const inputRef = useRef(null)
  const { mutate, isSuccess, isLoading } = useMutation(addFilm)

  /**
   * Si la subida de la película es exitosa, se pasa al último step del Modal y se recargan mis películas para que muestre la nueva.
   */
  useEffect(() => {
    if (isSuccess) {
      setStep(2)
      refetch()
    }
  }, [isSuccess])

  /**
   * Creamos un FormData para enviar el title y la imagen de la película a la base.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", filmTitle)
    formData.append("poster", filmPoster)
    const newData = Object.fromEntries(formData.entries())
    mutate(newData)
  };

  /**
   * Cierra el Modal y resetea todos los state relacionados.
   */
  const onClose = () => {
    setStep(0)
    setProgressBarPercentage("0%")
    setIsModalOpen(false)
    setFilmPoster('')
    setFilmTitle('')
  }

  return (
    <>
      <div className={`${styles.modal} ${isModalOpen ? styles.visible : styles.hidden}`}>
        <ModalHeader isMobile={isMobile} step={step} onClose={onClose} />
        {step === 2 ? (
          <>
            <div className={styles.uploaded}>
              <span className={styles.uploadedTitle}>¡Felicitaciones!</span>
              <span className={styles.uploadedText}>{filmTitle} fue correctamente subida.</span>
            </div>
            <Button className={styles.subirButton} onClick={onClose} text="Ir a Home" />
          </>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <UploadFile inputRef={inputRef} step={step} setStep={setStep} progressBarPercentage={progressBarPercentage} setProgressBarPercentage={setProgressBarPercentage} filmPoster={filmPoster} setFilmPoster={setFilmPoster} />
            <input name="title" type="text" placeholder="Título" className={styles.inputText} onChange={e => setFilmTitle(e.target.value)} />
            <div className={styles.buttons}>
              <Button type="submit" disabled={filmPoster === '' || filmTitle === '' || step !== 1 || progressBarPercentage !== "100%"} className={styles.subirButton} text={isLoading ? "Subiendo..." : "Subir Película"} />
              {isMobile && (<Button type="button" className={styles.salirButton} onClick={onClose} text="Salir" />)}
            </div>
          </form>
        )}
      </div>
      {isModalOpen && !isMobile && <div className={styles.modalBackdrop} />}
    </>
  )
}