import Image from 'next/image'
import Loader from '../Loader'

/**
 * Button.
 * Puede mostrar un Loader como una imagen y/o un texto.
 */

export default function Button({ type, disabled = false, className, onClick, image, text, isLoading }) {
  if (isLoading) {
    return (
      <button type={type} disabled={disabled} className={className} onClick={onClick}>
        <Loader />
      </button>
    )
  }

  return (
    <button type={type} disabled={disabled} className={className} onClick={onClick}>
      {image && (
        <Image
          src={image?.src}
          height={image?.height}
          width={image?.width}
          alt={image?.alt}
          {...(image?.className && { className: image?.className })}
        />
      )}
      {text && text}
    </button>
  )
}
