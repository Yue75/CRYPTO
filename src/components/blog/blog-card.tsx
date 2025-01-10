import { ThumbsUp } from 'lucide-react'
import { FC, JSX } from 'react'
import BlogOption from '../../features/Blog/blog-option'
import { Button } from '../ui/button'

interface IBlogCardProps {
  user: {
    avatar: string
    pseudo: string
  }
  message: string
  handleDelete: (postId: string) => void
  handleLike: (postId: string) => void
  postId: string
  handleEdit: (postId: string, newTitle: string, newContent: string) => void
  currentPost: {
    message: string
    title: string
    date: string
    like: number
  }
}

const BlogCard: FC<IBlogCardProps> = ({
  message,
  user,
  handleDelete,
  postId,
  handleLike,
  handleEdit,
  currentPost,
}): JSX.Element => {
  const formattedTime = new Date(currentPost.date).toLocaleTimeString()

  return (
    <section className='border px-8 py-4 rounded-xl'>
      <article className='flex items-start justify-between'>
        <div className='flex gap-4'>
          <img src={user.avatar} alt='' className='w-10 h-10 rounded-full object-cover' />
          <div className='space-y-1'>
            <div className='flex items-end gap-1'>
              <h2 className='font-medium text-xl'>{user.pseudo}</h2>
              <span className='text-sm text-zinc-500'>{formattedTime}</span>
            </div>
            <p className='text-zinc-300'>{message}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button size={'icon'} variant='ghost' className='px-4' onClick={() => handleLike(postId)}>
            <ThumbsUp /> {currentPost.like}
          </Button>
          <Button size='sm' variant='outline'>
            Suivre
          </Button>
          <BlogOption
            handleDelete={handleDelete}
            postId={postId}
            handleEdit={handleEdit}
            currentPost={currentPost}
          />
        </div>
      </article>
    </section>
  )
}

export default BlogCard
