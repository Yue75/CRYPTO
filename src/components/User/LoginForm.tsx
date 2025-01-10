import { useToast } from '@/hook/use-toast'
import { UserContext } from '@/hook/user-context'
import React, { FC, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'

const LoginForm: FC = () => {
  const userContext = useContext(UserContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (handleLogin(username, password)) {
      navigate('/')
      toast({
        title: `Bienvenu ${username} 👋`,
      })
    }
    setUsername('')
    setPassword('')
  }

  if (!userContext) {
    return null
  }

  const { handleLogin } = userContext

  return (
    <div className='flex items-center justify-center mt-24'>
      <div className='border rounded-md p-8 max-w-sm w-full'>
        <h2 className='text-4xl font-bold mb-6'>Connexion</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Username Field */}
          <div>
            <label htmlFor='username' className='block text-sm font-medium'>
              Nom d'utilisateur
            </label>
            <Input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='block w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium'>
              Mot de passe
            </label>
            <Input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all'
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
