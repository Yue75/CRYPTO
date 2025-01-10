import { FC } from 'react'
import { Link } from 'react-router-dom'

interface CryptoProps {
  crypto: {
    id: string
    name: string
  }
}

const BlogButton: FC<CryptoProps> = ({ crypto }) => {
  return (
    <div>
      <Link to={`/blog/${crypto.id}`} className='text-bold text-xl'>
        <button>{crypto.name} Blog</button>
      </Link>
    </div>
  )
}

export default BlogButton
