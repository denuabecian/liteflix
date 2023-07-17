import styles from './Card.module.css'
import Button from '../Button'
import Image from 'next/image'

/**
 * Card de la sección de películas populares o 'Mis películas'.
 */
export default function Card({ data, urlImage }) {
  if (!data) {
    return <div className={styles.emptyCard} />
  }

  return (
    <div className={styles.card} style={{ backgroundImage: `url(${urlImage || ''}${data.poster_path})` }}>
      <div className={styles.gradient} />
      <div className={styles.hover}>
        <div className={styles.playWithTitle}>
          <Button className={styles.button} image={{ src: "/images/playWithEllipse.svg", height: 24, width: 24, alt: "Play With Ellipse" }} />
          <Button className={styles.buttonHover} image={{ src: "/images/playWithEllipseHover.svg", height: 24, width: 24, alt: "Play With Ellipse Hover" }} />
          <span className={styles.hoverTitle}>{data.title}</span>
        </div>
        {data?.vote_average && data?.release_date && (  
          <div className={styles.filmData}>
            <div className={styles.stars}>
              <Image
                src="/images/star.svg"
                height={12}
                width={12}
                alt="Stars"
              />
              <span className={styles.vote}>{data.vote_average}</span>
            </div>
            <span className={styles.year}>{data.release_date?.substring(0, 4)}</span>
          </div>
        )}
      </div>
      <div className={styles.idle}>
        <Button className={styles.button} image={{ src: "/images/playWithEllipse.svg", height: 40, width: 40, alt: "Play With Ellipse" }} />
        <span className={styles.title}>{data.title}</span>
      </div>
    </div>
  )
}
