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
    <header className='flex pb-5 px-5 md:px-10 lg:px-20'>
      <label htmlFor='file_csv' className='flex items-center w-full ring-1 hover:ring-2 bg-pantone-468 ring-black hover:ring-pantone-7420 text-xs sm:text-base lg:text-lg pl-1 md:pl-3 lg:pl-5 py-1 cursor-pointer truncate'>
        <p className='uppercase text-black'>{search ? search.name : 'Seleccione CSV local...'}</p>
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
        className='bg-pantone-7420 hover:bg-pantone-7421 px-2 sm:px-3 lg:px-5 ring-1 ring-pantone-7421 rounded-r-sm text-sm sm:text-lg lg:text-xl'>
        <FaFileUpload className='text-pantone-468' />
      </button>
    </header>
  )
}
