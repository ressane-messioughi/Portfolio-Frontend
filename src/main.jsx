import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthProvider.jsx'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/LayoutComponents/Header.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/LayoutComponents/Footer.jsx'
import ScrollToTop from './components/ToolComponents/ScrollToTop.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
      <Header />
      <ToastContainer theme="dark" position="top-right" />
        <main>
        <App />
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
