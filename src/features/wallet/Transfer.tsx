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

interface ITransferProps {
  handleTransfer: (amount: number, recipientAddress: string) => void
  setCurrency: (currency: 'USD' | 'BTC' | 'ETH') => void
}

const Transfer: FC<ITransferProps> = ({ handleTransfer, setCurrency }) => {
  const [amount, setAmount] = useState<number>(0)
  const [recipientAddress, setRecipientAddress] = useState<string>('')
  const { toast } = useToast()

  const setCur = (value: 'USD' | 'BTC' | 'ETH') => {
    setCurrency(value)
  }

  const transfer = () => {
    handleTransfer(amount, recipientAddress)
    setAmount(0)
    setRecipientAddress('')
    toast({
      title: 'Transfer effectué',
    })
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ size: 'sm' })}>Transfer</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-4'>Transfer</DialogTitle>
          <div className='space-y-3'>
            <Input
              placeholder='Amount'
              onChange={(e) => setAmount(Number(e.target.value))}
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
              placeholder='Recipient Address'
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>
        </DialogHeader>

        <DialogClose className={buttonVariants()} onClick={transfer}>
          Transfer
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default Transfer
