/* eslint-disable react-hooks/rules-of-hooks */

import { useFormatNumber } from '@/hook/use-convert-number'
import { useIsNegative } from '@/hook/use-is-negative'
import { cn } from '@/lib/utils'
import { Cryptos } from '@/types/cryptos'
import { FC, JSX } from 'react'
import { Link } from 'react-router'

interface IMarketOverviewCardProps {
  title: string
  cryptos: Array<Cryptos>
}

const MarketOverviewCard: FC<IMarketOverviewCardProps> = ({ cryptos, title }): JSX.Element => {
  return (
    <section className='border rounded-xl p-4 w-full'>
      <article className='flex items-center justify-between text-xs font-medium'>
        <h2>{title}</h2>
        <Link to='/'>More</Link>
      </article>
      {cryptos.map((crypto, key) => (
        <article key={key} className='flex items-center justify-between mt-4 text-sm'>
          <h3 className='font-bold'>{crypto.symbol}</h3>
          <p>${useFormatNumber(Number(crypto.price_usd))}</p>
          <p
            className={cn(
              useIsNegative(crypto.percent_change_24h) ? 'text-destructive' : 'text-green-400',
              'font-bold'
            )}
          >
            {crypto.percent_change_24h}%
          </p>
        </article>
      ))}
    </section>
  )
}

export default MarketOverviewCard
