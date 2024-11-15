'use client'

import { useManager } from "@/app/hooks/useManager";
import { useState, useEffect } from "react"
import { FaFolder, FaFile, FaFileCircleXmark } from "react-icons/fa6";
import { PiKeyReturnFill } from "react-icons/pi";

type FileListProps = {
    main_file: string
}

export default function FileList({ main_file }: FileListProps) {

    const { state, dispatch } = useManager()
    const [history, setHistory] = useState<string[]>([main_file])
    const [isBackSelected, setBackSelected] = useState<boolean>(false)

    useEffect(() => {
        fetch(`/api/obtain-files`)
            .then(response => response.json())
            .then(data => dispatch({ type: 'set-files', payload: { files: data.files } }))
            .catch(error => console.log('Error: ', error))
    }, [])

    useEffect(() => {
        if (state.selectedFile) {
            if (!isBackSelected) { setHistory([...history, state.selectedFile]) }

            setBackSelected(false)

            fetch(`/api/obtain-files/${state.selectedFile}`)
                .then(response => response.json())
                .then(data => dispatch({ type: 'set-files', payload: { files: data.files } }))
                .catch(error => console.log('Error: ', error))
        }
    }, [state.selectedFile])

    const handleBackButton = () => {
        if (history.length > 1) {
            setBackSelected(true)

            dispatch({ type: 'set-selected-file', payload: { file: history[history.length - 2] } })
            setHistory(history.filter((file, index) => index != history.length - 1))
        }
    }

    return (
        <section className='border bg-egg-500 border-black mt-5 pb-5'>
            <menu className='bg-orange-300 border-b border-orange-500 mb-5 p-1'>
                <PiKeyReturnFill className={`text-2xl ${history.length == 1 && 'text-orange-700'} ${history.length > 1 && 'cursor-pointer'}`} onClick={handleBackButton} />
            </menu>
            {state.gFiles.length > 0 && state.gFiles[0].mimeType !== 'undef' ?
                <ol className='grid grid-cols-4 gap-3'>
                    {state.gFiles.map((file, index) => (
                        <li key={index} className='flex flex-col justify-center items-center'>
                            {file.mimeType === 'application/vnd.google-apps.folder' ?
                                <FaFolder className='text-[5rem] text-amber-500 hover:text-amber-400 cursor-pointer' onDoubleClick={() => dispatch({ type: 'set-selected-file', payload: { file: file.id } })} />
                                :
                                file.name.endsWith('csv') ?
                                    <FaFile className='text-[5rem] text-blue-400 hover:text-blue-300 cursor-pointer' />
                                    :
                                    <FaFileCircleXmark className='text-[5rem] text-blue-200' />
                            }
                            <p>{file.name}</p>
                        </li>
                    ))}
                </ol>
                :
                state.gFiles.length > 0 ?
                    <p className='uppercase text-2xl font-medium bg-red-300 border border-red-500 rounded-sm py-3 px-3 mx-14 text-center'>Carpeta Vacia</p>
                    :
                    <p className='uppercase text-2xl font-medium bg-orange-300 border border-orange-500 rounded-sm py-3 px-3 mx-14 text-center'>Cargando...</p>
            }
        </section>
    )

}
