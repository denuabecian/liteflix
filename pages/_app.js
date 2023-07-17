import '../styles/global.css'
import { Bebas_Neue } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue',
})

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={bebasNeue.className}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  )
}
