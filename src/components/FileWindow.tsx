'use client'

import { useManager } from "@/app/hooks/useManager"
import { useState } from "react"
import { PiKeyReturnFill } from "react-icons/pi";
import { FaMinimize, FaMaximize } from "react-icons/fa6";
import FileList from "./FileList";
import SearchBar from "./SearchBar";

type FileListProps = {
    main_file: string
}

export default function FileWindow({ main_file }: FileListProps) {

    const { dispatch } = useManager()

    const [isOpen, setOpen] = useState(true)
    const [history, setHistory] = useState<string[]>([main_file])
    const [isBackSelected, setBackSelected] = useState<boolean>(false)

    const handleBackButton = () => {
        if (history.length > 1 && isOpen) {
            setBackSelected(true)

            dispatch({ type: 'set-selected-file', payload: { file: history[history.length - 2] } })
            setHistory(history.filter((file, index) => index != history.length - 1))
        }
    }

    const handleMaxMinWindow = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <section className='border bg-egg-600 border-black mt-5'>
            <menu className='flex items-center justify-between px-3 bg-pantone-7420 border-b border-pantone-7421 p-1'>
                <PiKeyReturnFill className={`text-lg md:text-xl lg:text-2xl ${history.length === 1 || !isOpen ? 'text-pantone-7420' : 'text-pantone-468'} ${history.length > 1 && isOpen && 'cursor-pointer'}`} onClick={handleBackButton} />
                {isOpen ?
                    <FaMinimize className='text-sm md:text-lg lg:text-xl cursor-pointer text-pantone-468' onClick={handleMaxMinWindow} />
                    :
                    <FaMaximize className='text-sm md:text-lg lg:text-xl cursor-pointer text-pantone-468' onClick={handleMaxMinWindow} />
                }
            </menu>
            <div className={`${!isOpen && 'hidden'} my-5`}>
                <SearchBar />
                <FileList
                    isBackSelected={isBackSelected}
                    setBackSelected={setBackSelected}
                    setHistory={setHistory}
                />
            </div>
        </section>
    )
}
