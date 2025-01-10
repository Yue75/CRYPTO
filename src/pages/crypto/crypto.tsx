/* eslint-disable react-hooks/rules-of-hooks */
import CryptoChart from '@/components/crypto/CryptoChart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import UserMessage from '@/components/User/user-message'
import BlogButton from '@/features/Blog/BlogButton'
import BuyCrypto from '@/features/crypto/buy'
import { useFormatNumberCrypto } from '@/hook/use-convert-number'
import { getCrypto } from '@/lib/coin-lore'
import { Crypto } from '@/types/crypto'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CryptoPriceHistory from './crypto-price-history'

const CryptoDetails: FC = () => {
  const { id: cryptoId } = useParams<{ id: string }>()
  const [crypto, setCrypto] = useState<Crypto | null>(null)

  const generatePriceData = (basePrice: number, numPoints: number): number[] => {
    const data = []
    let currentPrice = basePrice

    for (let i = 0; i < numPoints; i++) {
      const variation = (Math.random() - 0.5) * 10
      currentPrice = Math.max(currentPrice + variation, 0)
      data.push(Number(currentPrice.toFixed(2)))
    }

    return data
  }

  useEffect(() => {
    async function getCryptoById(id: number) {
      const crypto = await getCrypto(Number(id))
      // @ts-expect-error - fix plus tard
      setCrypto(crypto)
    }

    if (cryptoId !== undefined) {
      getCryptoById(Number(cryptoId))
    }
  }, [cryptoId])

  if (!crypto) return <div>Loading...</div>

  return (
    <section className='max-w-7xl mx-auto mt-24 grid grid-cols-[1fr_.5fr] gap-14 pb-14'>
      <article className='space-y-16'>
        <section className='flex justify-between items-start'>
          <div className='space-y-2'>
            <h1 className='text-5xl font-medium'>
              {crypto.name} Price ({crypto.symbol})
            </h1>
            <h3 className='text-lg font-medium'>
              {crypto.symbol} to <span className='text-green-400'>USD</span>: 1 {crypto.name} equals
              $ {useFormatNumberCrypto(crypto.price_usd)} USD{' '}
              <span className='text-green-400'>+0.31%</span>
            </h3>
          </div>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Currency' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='USD'>USD</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <CryptoChart
          data={[
            generatePriceData(Number(crypto.price_usd), 10)[0],
            generatePriceData(Number(crypto.price_usd), 5)[0],
            generatePriceData(Number(crypto.price_usd), 20)[0],
            generatePriceData(Number(crypto.price_usd), 15)[0],
            generatePriceData(Number(crypto.price_usd), 10)[0],
            generatePriceData(Number(crypto.price_usd), 25)[0],
          ]}
        />

        <section className='space-y-6'>
          <h2 className='text-4xl font-medium'>Price of {crypto.symbol} today</h2>
          <p className='text-zinc-400'>
            The live price of Bitcoin is $ 93,791.45 per ({crypto.symbol} / USD) with a current
            market cap of $ 1,857.80B USD. 24-hour trading volume is $ 61.65B USD. BTC to USD price
            is updated in real-time. Bitcoin is +0.31% in the last 24 hours with a circulating
            supply of 19.81M.
          </p>
        </section>

        <section className='space-y-6'>
          <h2 className='text-xl font-medium'>{crypto.symbol} Price History USD</h2>
          <CryptoPriceHistory crypto={crypto} />
        </section>
      </article>

      <article className='space-y-6'>
        <section className='border rounded-xl p-6 w-full'>
          <BuyCrypto crypto={{ price_usd: crypto.price_usd, symbol: crypto.symbol }} />
        </section>

        <section className='border rounded-xl p-6 w-full'>
          <h2 className='text-2xl font-medium mb-4'>Square</h2>
          <article>
            <UserMessage
              message='$BTC why screen becomes grrreen all'
              user={{
                avatar:
                  'https://images.unsplash.com/photo-1727891521863-ba8c598bad4e?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                username: 'king of gainer',
              }}
            />
          </article>
        </section>

        <section className='border rounded-xl p-6 w-full'>
          <BlogButton crypto={{ id: cryptoId!, name: crypto.name }} />
        </section>
      </article>
    </section>
  )
}

export default CryptoDetails
