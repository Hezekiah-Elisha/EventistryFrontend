import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className='flex flex-col justify-center align-middle h-full w-full'>
        <h1>Sorry! Page not found</h1>
        <Link to="/" className='text-blue-950'>Go back to the homepage</Link>
    </div>
  )
}
