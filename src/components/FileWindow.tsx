'use client'

import { useManager } from "@/app/hooks/useManager"
import { useState } from "react"
import { PiKeyReturnFill } from "react-icons/pi";
import { FaMinimize, FaMaximize } from "react-icons/fa6";
import FileList from "./FileList";

type FileListProps = {
    main_file: string
}

export default function FileWindow({ main_file }: FileListProps) {

    const { dispatch } = useManager()

    const [isOpen, setOpen] = useState(true)
    const [history, setHistory] = useState<string[]>([main_file])
    const [isBackSelected, setBackSelected] = useState<boolean>(false)

    const handleBackButton = () => {
        if (history.length > 1) {
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
            <menu className='flex items-center justify-between px-3 bg-orange-300 border-b border-orange-500 p-1'>
                <PiKeyReturnFill className={`text-2xl ${history.length == 1 && 'text-orange-300'} ${history.length > 1 && 'cursor-pointer'}`} onClick={handleBackButton} />
                {isOpen ?
                    <FaMinimize className='text-xl cursor-pointer' onClick={handleMaxMinWindow} />
                    :
                    <FaMaximize className='text-xl cursor-pointer' onClick={handleMaxMinWindow} />
                }
            </menu>
            <div className={`${!isOpen && 'hidden'} my-5`}>
                <FileList
                    isBackSelected={isBackSelected}
                    setBackSelected={setBackSelected}
                    setHistory={setHistory}
                />
            </div>
        </section>
    )
}
