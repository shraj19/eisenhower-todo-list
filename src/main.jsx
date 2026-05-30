import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="app-header">
      <h1>Todo App</h1>
    </div>
    <App />
  </StrictMode>,
)
