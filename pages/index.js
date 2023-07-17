import { useState } from 'react'
import { useQuery } from 'react-query'
import useWindowSize from '../hooks/window-size'
import PageHead from '../components/Head'
import Header from '../components/Header'
import Card from '../components/Card'
import Dropdown from '../components/Dropdown'
import Modal from '../components/Modal'
import Button from '../components/Button'
import styles from '../styles/Home.module.css'
import getFilms from './api/getFilms'

const urlImage = 'https://image.tmdb.org/t/p/original'
const dropdownItems = [{ id: 0, label: 'Populares' }, { id: 1, label: 'Mis películas' }]

/**
 * Página inicial.
 */
export default function Home({ destacada, populares, misPeliculasGuardadas }) {
  const { isMobile } = useWindowSize()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dropdownOption, setDropdownOption] = useState(dropdownItems[0])
  /**
   * Seteamos la información de la película del fondo
   */
  const { poster_path, title } = destacada[2]
  const { data: misPeliculas = [], refetch } = useQuery('misPeliculas', getFilms, { initialData: misPeliculasGuardadas, refetchOnWindowFocus: false })

  /**
   * Devuelve las películas de la sección de la derecha.
   */
  const getOtherFilms = () => {
    /**
     * Validamos si se eligió la opción de 'Mis Películas' para saber si tenemos que rellenar con cards vacías o no.
     */
    if (dropdownOption.id === 1) {
      const cards = []
      for (let i = 0; i < 4; i++) {
        const index = misPeliculas.length - 1 - i
        cards.push(<Card key={`card-${i}`} {...(misPeliculas[index] && { data: misPeliculas[index]})} />)
      }
      return cards
    }

    return populares?.slice(0, 4)?.map(card => <Card key={`card-${card.id}`} data={card} urlImage={urlImage} />)
  }

  return (
    <div className={`${styles.layout} ${isMobile && isModalOpen ? styles.withoutScroll : ''}`} style={{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.1), rgb(0, 0, 0)), url(${urlImage}${poster_path})` }}>
      <PageHead />
      <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className={styles.content}>
        <div className={styles.destacada}>
          <span className={styles.span}>Original de <strong>Liteflix</strong></span>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.buttons}>
            <Button className={styles.reproducirButton} image={{ src: "/images/play.svg", height: 14, width: 14, alt: "Play" }} text="Reproducir" />
            <Button className={styles.miListaButton} image={{ src: "/images/plus.svg", height: 14, width: 14, alt: "Plus" }} text="Mi Lista" />
          </div>
        </div>
        <div className={styles.otrasPeliculas}>
          <Dropdown setDropdownOption={setDropdownOption} dropdownOption={dropdownOption} dropdownItems={dropdownItems} />
          {getOtherFilms()}
        </div>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refetch={refetch} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const destacadaRes = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20')
  const destacadaJson = await destacadaRes.json()
  const popularesRes = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20')
  const popularesJson = await popularesRes.json()
  const misPeliculasGuardadas = await getFilms()

  return {
    props: {
      destacada: destacadaJson?.results,
      populares: popularesJson?.results,
      misPeliculasGuardadas
    },
  }
}
