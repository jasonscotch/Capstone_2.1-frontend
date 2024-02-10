import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './dist/rpgui.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='rpgui-content'>
      <App />
    </div>
  </React.StrictMode>,
)
