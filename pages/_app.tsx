import '../styles/globals.css'

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC
  pageProps: {
    [x: string]: string
  }
}): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
