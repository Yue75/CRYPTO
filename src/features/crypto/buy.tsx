/* eslint-disable react-hooks/rules-of-hooks */
import { useFormatNumberCrypto } from '@/hook/use-convert-number'
import { cn } from '@/lib/utils'
import { FC, JSX, useRef, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

interface IBuyCryptoProps {
  crypto: {
    price_usd: string
    symbol: string
  }
}

const BuyCrypto: FC<IBuyCryptoProps> = ({ crypto }): JSX.Element => {
  const [spend, setSpend] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const changeSpendingMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setSpend(value * Number(crypto.price_usd))
  }

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value === '') {
      inputRef.current.value = '10, 50,000'
    }
  }

  return (
    <section className='space-y-4'>
      <Input
        ref={inputRef}
        placeholder='0'
        onChange={changeSpendingMoney}
        onBlur={handleBlur}
        className='h-14'
        type='number'
      />
      <p className='text-zinc-500 text-sm'>
        1 {crypto.symbol} = USD ${useFormatNumberCrypto(crypto.price_usd)}
      </p>
      <div className='border rounded-xl py-2 px-6 space-y-3'>
        <p className='text-zinc-400'>You spend</p>
        <p className={cn('text-xl font-medium', { 'text-zinc-500': spend === 0 })}>
          {spend === 0 ? '10, 50,000' : `$ ${useFormatNumberCrypto(String(spend))}`}
        </p>
      </div>
      <Button className='w-full' size='lg'>
        Buy {crypto.symbol}
      </Button>
    </section>
  )
}

export default BuyCrypto
