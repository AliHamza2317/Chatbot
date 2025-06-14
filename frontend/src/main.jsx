import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import LoginPage from './Login.jsx'
import Route from './Routes.jsx'
import Chatbot from './Chatbot.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <QuizPage /> */}
    <Route />
  </StrictMode>,
)
