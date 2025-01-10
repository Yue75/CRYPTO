import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFormatNumberCrypto } from '@/hook/use-convert-number'
import { useIsNegative } from '@/hook/use-is-negative'
import { cn } from '@/lib/utils'
import { Crypto } from '@/types/crypto'
import { FC, JSX } from 'react'

interface ICryptoPriceHistoryProps {
  crypto: Crypto
}

const CryptoPriceHistory: FC<ICryptoPriceHistoryProps> = ({ crypto }): JSX.Element => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date Comparaison</TableHead>
          <TableHead>Amount Change</TableHead>
          <TableHead className='text-right'>% Change</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='font-medium'>Today</TableCell>
          <TableCell
            className={
              useIsNegative(crypto.percent_change_1h) ? 'text-green-400' : 'text-destructive'
            }
          >
            $ {useFormatNumberCrypto(crypto.price_usd)}
          </TableCell>
          <TableCell
            className={cn(
              useIsNegative(crypto.percent_change_1h) ? 'text-destructive' : 'text-green-400',
              'text-right'
            )}
          >
            {crypto.percent_change_1h}%
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>24h</TableCell>
          <TableCell
            className={
              useIsNegative(crypto.percent_change_1h) ? 'text-green-400' : 'text-destructive'
            }
          >
            $ {useFormatNumberCrypto(crypto.price_usd)}
          </TableCell>
          <TableCell
            className={cn(
              useIsNegative(crypto.percent_change_1h) ? 'text-destructive' : 'text-green-400',
              'text-right'
            )}
          >
            {crypto.percent_change_24h}%
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className='font-medium'>7 days</TableCell>
          <TableCell
            className={
              useIsNegative(crypto.percent_change_1h) ? 'text-green-400' : 'text-destructive'
            }
          >
            $ {useFormatNumberCrypto(crypto.price_usd)}
          </TableCell>
          <TableCell
            className={cn(
              useIsNegative(crypto.percent_change_7d) ? 'text-destructive' : 'text-green-400',
              'text-right'
            )}
          >
            {crypto.percent_change_7d}%
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default CryptoPriceHistory
