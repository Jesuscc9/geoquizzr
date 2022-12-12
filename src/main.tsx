import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { CustomRouter } from './components/UI'
import { SWRConfig } from 'swr'
import { fetcher } from './helpers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomRouter>
        <SWRConfig value={{ fetcher }}>
          <App />
        </SWRConfig>
      </CustomRouter>
    </BrowserRouter>
  </React.StrictMode>
)
