import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Evnin from './components/Evnin.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
  <Routes>
        <Route path="/" element={<App />} />
        <Route path="/evnin" element={<Evnin />} />
      </Routes>
  </StrictMode>
  </BrowserRouter>
)
