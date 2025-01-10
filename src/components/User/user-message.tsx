import { FC, JSX } from 'react'

interface IUserMessageProps {
  user: {
    avatar: string
    username: string
  }
  message: string
}

const UserMessage: FC<IUserMessageProps> = ({ message, user }): JSX.Element => {
  return (
    <section className='flex items-start gap-4'>
      <article>
        <img src={user.avatar} alt='okko' className='rounded-full w-8 h-8' />
      </article>
      <article className='space-y-2'>
        <h2 className='font-medium'>{user.username}</h2>
        <p className='text-sm'>{message}</p>
      </article>
    </section>
  )
}

export default UserMessage
