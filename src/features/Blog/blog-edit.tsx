import { buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { FilePenLine } from 'lucide-react'
import { FC, JSX, useState } from 'react'

interface IBlogEditProps {
  currentPost: {
    message: string
    title: string
  }
  postId: string
  handleEdit: (postId: string, newTitle: string, newContent: string) => void
}

const BlogEdit: FC<IBlogEditProps> = ({ currentPost, postId, handleEdit }): JSX.Element => {
  const [newContent, setNewContent] = useState<string>('')

  return (
    <Dialog>
      <DialogTrigger className='flex items-center gap-2 w-full'>
        <FilePenLine size={17} />
        Edit
      </DialogTrigger>
      <DialogContent onKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader className='space-y-3'>
          <DialogTitle>Modifier votre message</DialogTitle>
          <Textarea
            defaultValue={currentPost.message}
            onChange={(e) => setNewContent(e.target.value)}
          ></Textarea>
        </DialogHeader>
        <DialogClose
          className={buttonVariants()}
          onClick={() => handleEdit(postId, 'newTitle', newContent)}
        >
          Modifier
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default BlogEdit
