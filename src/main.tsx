import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChangeUserProfile } from './components/search-friends'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <ChangeUserProfile isOpen={true} onClose={() => {}} />
  </React.StrictMode>,
)
