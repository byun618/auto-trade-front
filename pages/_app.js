import 'bootstrap/dist/css/bootstrap.css'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  // const queryClient = new QueryClient()

  return (
    // <QueryClientProvider queryClient={queryClient}>
    <RecoilRoot>
      <Component {...pageProps} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </RecoilRoot>
    // </QueryClientProvider>
  )
}

export default App
