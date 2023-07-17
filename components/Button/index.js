import Image from 'next/image'

export default function Button({ type, disabled = false, className, onClick, image, text }) {
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
