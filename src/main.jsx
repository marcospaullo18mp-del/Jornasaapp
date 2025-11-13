import React from 'react'
import { createRoot } from 'react-dom/client'
import JornalismoApp from './JornalismoApp'
import './index.css'

function Main() {
  return <JornalismoApp />
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
