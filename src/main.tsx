import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initWebContainerAuth } from './webcontainer-auth'

// auth.init must run once, before WebContainer.boot() is ever called.
initWebContainerAuth()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
