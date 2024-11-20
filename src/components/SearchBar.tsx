'use client'

import { useManager } from "@/app/hooks/useManager"
import { ChangeEvent, useState } from "react"
import { FaFileUpload } from "react-icons/fa";

export default function SearchBar() {

  const [search, setSearch] = useState<File | null>(typeof window !== "undefined" ? new File(['empty'], 'Seleccione CSV local...') : null)
  const { dispatch } = useManager()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.files![0])
  }

  const handleUpload = () => {
    if (search && search.size > 5) {
      dispatch({ type: 'set-selected-csv', payload: { csv: '' } })
      dispatch({ type: 'set-search-text', payload: { search } })

      setSearch(typeof window !== "undefined" ? new File(['empty'], 'Seleccione CSV local...') : null)
    }

  }

  return (
    <header className='flex border bg-egg-400 border-black py-4 px-20 shadow-md'>
      <label htmlFor='file_csv' className='flex items-center w-full ring-1 hover:ring-2 bg-egg-900 ring-gray-900 hover:ring-orange-600 text-lg pl-5 py-1 cursor-pointer truncate'>
        <p className='uppercase text-gray-700'>{search ? search.name : 'Seleccione CSV local...'}</p>
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
        className='bg-orange-300 hover:bg-orange-500 px-5 ring-1 ring-orange-600 rounded-r-sm text-xl'>
        <FaFileUpload />
      </button>
    </header>
  )
}
