import BlogCard from '@/components/blog/blog-card'
import DialogMsg from '@/components/blog/blog-msg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hook/use-toast'
import { UserContext } from '@/hook/user-context'
import { getCrypto } from '@/lib/coin-lore'
import { Crypto } from '@/types/crypto'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

interface Post {
  id: string
  discussionId: string
  title: string
  content: string
  date: string
  likes: number
}

const Blog: React.FC = () => {
  const { id: cryptoId } = useParams<{ id: string }>()
  const [posts, setPosts] = useState<Post[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [crypto, setCrypto] = useState<Crypto | null>(null)
  const [newContent, setNewContent] = useState('')
  const { user } = useContext(UserContext)!
  const { toast } = useToast()

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts')
    if (storedPosts) {
      const allPosts = JSON.parse(storedPosts) as Post[]
      setPosts(allPosts.filter((post) => post.discussionId === cryptoId))
    }
  }, [cryptoId])

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

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts')
    const allPosts = storedPosts ? JSON.parse(storedPosts) : []
    const updatedPosts = allPosts
      .filter((post: Post) => post.discussionId !== cryptoId)
      .concat(posts)
    localStorage.setItem('posts', JSON.stringify(updatedPosts))
  }, [posts, cryptoId])

  const handlePost = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newPost: Post = {
        id: `${Date.now()}`,
        discussionId: cryptoId!,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString(),
        likes: 0,
      }
      setPosts([newPost, ...posts])
      setNewTitle('')
      setNewContent('')
    }

    toast({
      title: `Message envoyé`,
    })
  }

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
    toast({
      title: `Message supprimé`,
      variant: 'destructive',
    })
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleEdit = (postId: string, newTitle: string, newContent: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, title: newTitle, content: newContent } : post
      )
    )
    toast({
      title: `Message modifié`,
    })
  }

  // on peut accéder à wallet uniquement si on est connecté
  const navigate = useNavigate()
  useEffect(() => {
    if (user === null || user === undefined) navigate('/login')
  }, [navigate, user])

  if (user === undefined || user === null) return <>login</>

  if (!crypto) return <div>Loading...</div>

  const sorting = (value: string) => {
    let sortedPosts = [...posts]

    switch (value) {
      case 'likes': {
        sortedPosts = sortedPosts.sort((a, b) => b.likes - a.likes)
        break
      }
      case 'date': {
        sortedPosts = sortedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        break
      }
      default: {
        sortedPosts = sortedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        break
      }
    }

    setPosts(sortedPosts)
  }

  if (!crypto) return <div>Loading...</div>

  return (
    <section className='max-w-7xl mt-24 mx-auto space-y-6'>
      <article className='flex items-start justify-between'>
        <h2 className='text-5xl font-medium'>{crypto.name} Blog</h2>
        <DialogMsg
          setNewContent={setNewContent}
          handleClickPost={handlePost}
          setNewTitle={setNewTitle}
        />
      </article>

      <Select onValueChange={sorting}>
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder='Date' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='date'>Date</SelectItem>
          <SelectItem value='likes'>Likes</SelectItem>
        </SelectContent>
      </Select>

      <article className='mt-8 space-y-4'>
        {posts.map((post, key) => (
          <BlogCard
            key={key}
            user={{ pseudo: user.pseudo, avatar: user.avatar }}
            message={post.content}
            handleLike={handleLike}
            handleDelete={handleDelete}
            postId={post.id}
            handleEdit={handleEdit}
            currentPost={{
              message: post.content,
              title: post.title,
              date: post.date,
              like: post.likes,
            }}
          />
        ))}
      </article>
    </section>
  )
}

export default Blog
