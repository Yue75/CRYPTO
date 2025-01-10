/* eslint-disable react-refresh/only-export-components */

import { users } from '@/data/users'
import { User } from '@/types/user'
import React, { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { useToast } from './use-toast'

type UserType = {
  user: User | null
  handleLogout: () => void
  handleLogin: (username: string, password: string) => boolean
  setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext<UserType | null>(null)

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    toast({
      title: `Au revoir ${user?.pseudo} 👋`,
    })
  }

  const handleLogin = (pseudo: string, password: string) => {
    const userFound = users.find((u) => u.pseudo === pseudo && u.password === password)
    if (userFound) {
      localStorage.setItem('user', JSON.stringify(userFound))
      setUser(userFound)
      toast({
        title: 'Vous êtes connecté',
      })
      return true
    } else {
      toast({
        title: "Nom d'utilisateur ou mot de passe incorrect",
        variant: 'destructive',
      })
      return false
    }
  }

  return (
    <UserContext.Provider value={{ user, handleLogout, handleLogin, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
