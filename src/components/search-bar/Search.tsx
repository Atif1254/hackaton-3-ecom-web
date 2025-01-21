'use client'

import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const Search = ({ search }: { search?: string }) => {
  const [text, setText] = useState(search)
  useEffect(() => {
},[text])

  return (
    <div className='relative rounded-md shadow-sm'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
      </div>
      <input
        value={text}
        placeholder='Search...'
        onChange={e => setText(e.target.value)}
        className='block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
      />
    </div>
  )
}

export default Search