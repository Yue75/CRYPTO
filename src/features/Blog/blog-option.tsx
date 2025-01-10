import { EllipsisVertical, Trash2 } from 'lucide-react'
import { FC, JSX } from 'react'
import { buttonVariants } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import BlogEdit from './blog-edit'

interface IBlogOptionProps {
  postId: string
  handleDelete: (postId: string) => void
  handleEdit: (postId: string, newTitle: string, newContent: string) => void
  currentPost: {
    message: string
    title: string
  }
}

const BlogOption: FC<IBlogOptionProps> = ({
  postId,
  handleDelete,
  currentPost,
  handleEdit,
}): JSX.Element => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: 'outline', size: 'icon' })}>
        <EllipsisVertical size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <BlogEdit currentPost={currentPost} handleEdit={handleEdit} postId={postId} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete(postId)}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BlogOption
