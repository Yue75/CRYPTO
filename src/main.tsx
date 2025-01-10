/* eslint-disable react-refresh/only-export-components */

import Dashboard from '@/components/User/Dashboard'
import '@/styles/index.css'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import Nav from './components/nav'
import { Toaster } from './components/ui/toaster'
import LoginForm from './components/User/LoginForm'
import { UserProvider } from './hook/user-context'
import Blog from './pages/Blog'
import CryptoDetails from './pages/crypto/crypto'
import Home from './pages/home'
import Portefeuille from './pages/Portefeuille'
import Wallet from './pages/wallet'

// @ts-expect-error - ça sera fix plus tard
const root = createRoot(document.getElementById('root'))

const Main = () => {
  return (
    <UserProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/wallet' element={<Wallet />} />
          <Route path='/details/:id' element={<CryptoDetails />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/portefeuille' element={<Portefeuille />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

root.render(
  <>
    <Main />
    <Toaster />
  </>
)
