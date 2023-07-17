
import { useState } from 'react'
import styles from './UploadFile.module.css'
import InputFile from '../../../InputFile'
import Button from '../../../Button'

/**
 * Componente que permite cargar la imagen de la película.
 * Dependiendo en qué paso de la carga se encuentre, puede mostrar el Progress Bar que indica el estado de la carga o el botón para seleccionar el archivo.
 */ 
const UploadFile = ({ inputRef, step, setStep, progressBarPercentage, setProgressBarPercentage, setFilmPoster, filmPoster }) => {
  /**
   * isReady sirve para saber si la carga de la imagen ya se encuentra completa.
   */
  const isReady = progressBarPercentage === "100%"
  /**
   * Timeout para simular la carga del ProgressBar.
   */
  const [firstTimeout, setFirstTimeout] = useState(null)
  const [secondTimeout, setSecondTimeout] = useState(null)

  /**
   * Función que se ejecuta al haber seleccionado una imagen.
   */
  const onInputFileChange = () => {
    setFilmPoster(inputRef?.current?.files[0])
    setFirstTimeout(setTimeout(() => setProgressBarPercentage(Math.floor((Math.random() * 100) + 1) + "%"), 1000))
    setSecondTimeout(setTimeout(() => setProgressBarPercentage("100%"), 1500))
    setStep(1)
  }

  /**
   * Función que se ejecuta al cancelar la carga de la imagen.
   */
  const onCancel = () => {
    clearTimeout(firstTimeout)
    clearTimeout(secondTimeout)
    setProgressBarPercentage("0%")
    setStep(0)
  }
  
  /**
   * El step 1 del proceso muestra el proceso de la imagen cargada.
   */
  if (step === 1) {
    return (
      <div className={styles.loadingBar}>
        <span className={styles.loading}>{isReady ? `${progressBarPercentage} cargado` : `Cargando ${progressBarPercentage}`}</span>
        <div className={styles.progressBar}>
          <div className={styles.bar} style={{ width: progressBarPercentage }} />
        </div>
        {isReady ? <span className={styles.loadingReady}>¡Listo!</span> : <Button type="button" className={styles.cancel} onClick={onCancel} text="Cancelar" />}
      </div>
    )
  }

  /**
   * El step 0 del proceso muestra el Input que permite seleccionar el archivo para cargar.
   */
  return <InputFile inputRef={inputRef} onClick={() => inputRef?.current?.click()} onChange={onInputFileChange} filmPoster={filmPoster} />
}

export default UploadFile