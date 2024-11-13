'use client'

import { useManager } from "@/app/hooks/useManager"
import { ChangeEvent, useState } from "react"

export default function SearchBar() {

  const [search, setSearch] = useState<File>(new File(['empty'], 'Ingrese CSV...'))
  const { dispatch } = useManager()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.files![0])
  }

  const handleUpload = () => {
    dispatch({type: 'set-search-text', payload: {search}})

    setSearch(new File(['empty'], 'Ingrese CSV...'))
  }

  return (
    <header className='flex border bg-egg-400 border-black py-4 px-20 shadow-md'>
      <label htmlFor='file_csv' className='flex items-center w-full ring-1 hover:ring-2 ring-gray-900 hover:ring-orange-600 text-lg pl-5 py-1 cursor-pointer' >
        <p className='uppercase text-gray-700'>{search.name}</p>
      </label>
      <input
        id='file_csv'
        type='file'
        accept='.csv'
        onChange={handleChange}
        className='hidden'
      />
      <button
        onClick={handleUpload}
        className='bg-orange-500 hover:bg-orange-600 px-5 ring-1 ring-orange-600 rounded-r-sm text-xl'>
        UP
      </button>
    </header>
  )
}
