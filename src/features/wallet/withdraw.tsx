import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hook/use-toast'
import { FC, useState } from 'react'

interface IWithdrawProps {
  handleWithdraw: (amount: number, address: string) => void
  setCurrency: (currency: 'USD' | 'BTC' | 'ETH') => void
}

const Withdraw: FC<IWithdrawProps> = ({ handleWithdraw, setCurrency }) => {
  const [money, setMoney] = useState<number>(0)
  const [address, setAddress] = useState<string>('')
  const { toast } = useToast()

  const setCur = (value: 'USD' | 'BTC' | 'ETH') => {
    setCurrency(value)
  }

  const withd = () => {
    handleWithdraw(money, address)
    setMoney(0)
    setAddress('')
    toast({
      title: 'Withdraw effectué',
    })
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ size: 'sm' })}>Withdraw</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>Withdraw</DialogTitle>
          <div className='space-y-3'>
            <Input
              placeholder='$10'
              onChange={(e) => setMoney(Number(e.target.value))}
              type='number'
            />
            <Select onValueChange={setCur}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='USD' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='USD'>USD</SelectItem>
                <SelectItem value='BTC'>BTC</SelectItem>
                <SelectItem value='ETH'>ETH</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </DialogHeader>

        <DialogClose className={buttonVariants()} onClick={withd}>
          Withdraw
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default Withdraw
