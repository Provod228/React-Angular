import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import ThemeProvider from './context/theme/ThemeProvider.tsx'
import AuthProvider from './context/auth/AuthProvider.tsx'
import CartProvider from './context/cart/CartProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Провайдеры оборачивают всё приложение: любой компонент внутри может достать значение */}
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
