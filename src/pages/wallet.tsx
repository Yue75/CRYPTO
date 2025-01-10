/* eslint-disable react-hooks/rules-of-hooks */
import Deposit from '@/features/wallet/deposit'
import Withdraw from '@/features/wallet/withdraw'
import { useFormatNumberCrypto } from '@/hook/use-convert-number'
import { UserContext } from '@/hook/user-context'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

interface Transaction {
  type: 'deposit' | 'withdrawal'
  amount: number
  currency: 'USD' | 'BTC' | 'ETH'
  address?: string
  date: string
}

interface Wallet {
  balance: { [key: string]: number }
  transactions: Transaction[]
}

const Wallet: React.FC = () => {
  const { user } = useContext(UserContext) || {}
  const [wallet, setWallet] = useState<Wallet>({
    balance: { USD: 0, BTC: 0, ETH: 0 },
    transactions: [],
  })
  const [, setAmount] = useState<number>(0)
  const [currency, setCurrency] = useState<'USD' | 'BTC' | 'ETH'>('USD')
  const [, setAddress] = useState<string>('')
  const navigate = useNavigate()

  // Récupérer le portefeuille du localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet')
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet))
    }
  }, [])

  useEffect(() => {
    // Sauvegarder le portefeuille dans le localStorage après chaque modification
    localStorage.setItem('wallet', JSON.stringify(wallet))
  }, [wallet])

  useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

  const handleDeposit = (amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    const newTransaction: Transaction = {
      type: 'deposit',
      amount,
      currency,
      date: new Date().toISOString(),
    }

    // Mise à jour du portefeuille avec le nouveau solde
    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        [currency]: prevWallet.balance[currency] + amount,
      },
      transactions: [newTransaction, ...prevWallet.transactions],
    }))

    setAmount(0)
  }

  const handleWithdraw = (amount: number, address: string) => {
    if (isNaN(amount) || amount <= 0 || amount > wallet.balance[currency]) {
      alert('Please enter a valid amount to withdraw or check your balance.')
      return
    }

    const newTransaction: Transaction = {
      type: 'withdrawal',
      amount,
      currency,
      address,
      date: new Date().toISOString(),
    }

    setWallet((prevWallet) => ({
      balance: {
        ...prevWallet.balance,
        [currency]: prevWallet.balance[currency] - amount,
      },
      transactions: [newTransaction, ...prevWallet.transactions],
    }))

    setAmount(0)
    setAddress('')
  }

  if (!user) return <>Login</>

  return (
    <main className='max-w-7xl mx-auto mt-24'>
      <section className='space-y-6'>
        <section className='flex gap-8 justify-between'>
          <article className='flex gap-4'>
            <img
              src={user.avatar}
              alt=''
              className='w-36 object-cover rounded-full h-36 border border-zinc-100'
            />
            <h2 className='text-xl font-medium'>{user.pseudo}</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>UID</h2>
            <h2>{user.id}</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>VIP Level</h2>
            <h2>Regular User</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>Following</h2>
            <h2>0</h2>
          </article>
          <article>
            <h2 className='text-zinc-400'>Followers</h2>
            <h2>0</h2>
          </article>
        </section>

        <article className='rounded-xl border p-6 space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-medium'>Estimated Balance</h2>
            <div className='space-x-3'>
              <Deposit handleDeposit={handleDeposit} setCurrency={setCurrency} />
              <Withdraw handleWithdraw={handleWithdraw} setCurrency={setCurrency} />
            </div>
          </div>

          <h2 className='text-4xl font-bold'>
            {wallet.balance.BTC} <span className='font-normal text-sm'>btc</span>
          </h2>
          <h2 className='font-medium text-zinc-400'>
            ${useFormatNumberCrypto(String(wallet.balance.USD))}
          </h2>
        </article>

        <article className='rounded-xl border p-6 space-y-4'>
          <h2 className='text-2xl font-medium'>Transaction History</h2>
          {wallet.transactions.length === 0 ? (
            <p className='text-zinc-400'>No transactions available.</p>
          ) : (
            <ul className='space-y-2'>
              {wallet.transactions.map((transaction, index) => (
                <li key={index} className='flex justify-between items-center border-b pb-2'>
                  <div>
                    <h3 className='font-medium'>
                      {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} -{' '}
                      {transaction.currency}
                    </h3>
                    <p className='text-sm text-zinc-500'>{transaction.date}</p>
                  </div>
                  <h3
                    className={`${
                      transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                    } font-medium`}
                  >
                    {transaction.type === 'deposit' ? '+' : '-'}{' '}
                    {transaction.amount.toLocaleString()} {transaction.currency}
                  </h3>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </main>
  )
}

export default Wallet
