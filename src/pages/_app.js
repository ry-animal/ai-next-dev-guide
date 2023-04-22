import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='max-w-5xl mx-auto h-full pt-10'>
      <Component {...pageProps} />
    </div>
  )
}
