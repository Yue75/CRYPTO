import { UserContext } from '@/hook/user-context'
import { FC, useContext } from 'react'
import { Link } from 'react-router'

const Nav: FC = () => {
  const { user, handleLogout } = useContext(UserContext) || {}

  return (
    <nav className='py-4 px-8 fixed top-0 w-full bg-background'>
      <div className='flex items-center justify-between'>
        <div className='space-x-4'>
          <Link to='/'>Markets</Link>
          <Link to='/wallet'>Wallets</Link>
          <Link to='/portefeuille'>Portefeuille</Link>
        </div>

        <div className='flex items-center space-x-4'>
          {user ? (
            <>
              <span className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-all'>{user.pseudo}</span>
              <button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-all'
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link to='/login' className='text-lg font-medium text-blue-400 hover:text-blue-500'>
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
