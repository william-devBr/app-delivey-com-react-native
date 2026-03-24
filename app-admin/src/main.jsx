import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/User/index.jsx';
import { RestauranteProvider } from './contexts/Restaurante/index.jsx';
import { OrderProvider } from './contexts/Orders/index.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <RestauranteProvider>
        <OrderProvider>
            <App />
        </OrderProvider>
      </RestauranteProvider>
    </AuthProvider>
  </BrowserRouter>
)
