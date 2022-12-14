import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { CustomRouter } from './components/UI'
import { SWRConfig } from 'swr'
import { ToastContainer, toast } from 'react-toastify'
import { fetcher } from './helpers'
import 'react-toastify/dist/ReactToastify.css'

const onError = (err: any, key: string, config: any): void => {
  toast.error(err.message ?? 'Unexpected error', {
    toastId: key,
    autoClose: false
  })
  console.error({ err, key, config })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <CustomRouter>
        <SWRConfig
          value={{
            fetcher,
            onError
          }}
        >
          <App />
        </SWRConfig>
      </CustomRouter>
    </BrowserRouter>
  </React.StrictMode>
)
