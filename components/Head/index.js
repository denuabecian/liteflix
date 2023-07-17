import Head from 'next/head'

export const siteTitle = "Liteflix"
export default function PageHead() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{siteTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Peliculas en Liteflix" />
      <meta name="google" content="notranslate" />
    </Head>
  )
}
