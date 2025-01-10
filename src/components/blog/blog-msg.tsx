import { FC, JSX } from 'react'
import { buttonVariants } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface IDialogMsgProps {
  setNewContent: (meg: string) => void
  setNewTitle: (msg: string) => void
  handleClickPost: () => void
}

const DialogMsg: FC<IDialogMsgProps> = ({
  setNewContent,
  setNewTitle,
  handleClickPost,
}): JSX.Element => {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>Nouveau message</DialogTrigger>
      <DialogContent>
        <DialogHeader className='space-y-3'>
          <DialogTitle>Que voulez-vous dire ?</DialogTitle>
          <Input onChange={(e) => setNewTitle(e.target.value)} placeholder='Titre du post' />
          <Textarea
            onChange={(e) => setNewContent(e.target.value)}
            placeholder='Message du post'
          ></Textarea>
        </DialogHeader>
        <DialogClose className={buttonVariants()} onClick={handleClickPost}>
          Envoyer
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default DialogMsg
