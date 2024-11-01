import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function Hero() {
  return (
    <div className='bg-primary text-center h-1/2 flex flex-col justify-center align-middle items-center gap-2'>
        <h1 className='text-3xl text-white'>Welcome Eventistry</h1>
        <p className='text-white'>The best place to find and book events instruments</p>
        <div className='w-1/2 py-20'>
            <div className='flex flex-between justify-between align-middle w-full rounded-full bg-white'>
                <input type='text' placeholder='Search for instruments' className='border-none outline-none' />
                <button className='flex flex-row gap-2'>
                    <MagnifyingGlassIcon className='text-white size-6' />
                    <span>
                        Search
                    </span>
                </button>
            </div>
        </div>
    </div>
  )
}
