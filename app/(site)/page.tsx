import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 h-screen'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          alt='logo'
          height={100}
          width={100}
          className='mx-auto w-auto'
          src="/images/chat-logo.png"
        />
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
        <AuthForm />
      </div>
    </div>
  )
}
