'use client'

import { useManager } from "@/app/hooks/useManager";
import { Dispatch, SetStateAction, useEffect } from "react"
import { FaFolder, FaFileCircleXmark } from "react-icons/fa6";
import { CsvFileIcon } from "./util/CsvFileIcon";

type FileListProps = {
    isBackSelected: boolean
    setBackSelected: Dispatch<SetStateAction<boolean>>
    setHistory: Dispatch<SetStateAction<string[]>>
}

const ALL_TIME_FILE = 'papercut-print-log-all-time.csv'

export default function FileList({ isBackSelected, setBackSelected, setHistory }: FileListProps) {

    const { state, dispatch } = useManager()

    useEffect(() => {
        fetch(`/api/obtain-files`)
            .then(response => response.json())
            .then(data => dispatch({ type: 'set-files', payload: { files: data.files } }))
            .catch(() => dispatch({
                type: 'set-files', payload: {
                    files: [{
                        kind: 'ERROR OBTENIENDO ARCHIVOS',
                        mimeType: 'ERROR',
                        id: 'F0A',
                        name: 'ERROR FOA00'
                    }]
                }
            }))
    }, [dispatch])

    useEffect(() => {
        if (state.selectedFile) {
            if (!isBackSelected) { setHistory(prevState => [...prevState, state.selectedFile]) }

            setBackSelected(false)

            fetch(`/api/obtain-files/${state.selectedFile}`)
                .then(response => response.json())
                .then(data => dispatch({ type: 'set-files', payload: { files: data.files } }))
                .catch(() => dispatch({
                    type: 'set-files', payload: {
                        files: [{
                            kind: 'ERROR OBTENIENDO CONTENIDO',
                            mimeType: 'ERROR',
                            id: 'FCD',
                            name: 'ERROR FCD00'
                        }]
                    }
                }))
        }
    }, [state.selectedFile, dispatch])

    useEffect(() => {
        if (state.selectedCSV) {
            fetch(`/api/open-csv/${state.selectedCSV}`)
                .then(response => response.json())
                .then(data => dispatch({ type: 'set-records', payload: { records: data } }))
                .catch(error => console.log(error))
        }
    }, [state.selectedCSV, dispatch])


    return (
        <>
            {state.gFiles.length > 0 && state.gFiles[0].mimeType !== 'undef' ?
                <ol className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 '>
                    {state.gFiles.filter(file => file.name === ALL_TIME_FILE).concat(state.gFiles.filter(file => file.name !== ALL_TIME_FILE)).map((file, index) => (
                        <li key={index} className='flex flex-col justify-center items-center'>
                            {file.mimeType === 'application/vnd.google-apps.folder' ?
                                <FaFolder className='text-[4rem] md:text-[5rem] text-amber-500 hover:text-amber-400 cursor-pointer' onDoubleClick={() => dispatch({ type: 'set-selected-file', payload: { file: file.id } })} />
                                :
                                file.name.endsWith('csv') ?
                                    <CsvFileIcon fileId={file.id} fileName={file.name} />
                                    :
                                    <FaFileCircleXmark className='text-[4rem] md:text-[5rem] text-blue-200' />
                            }
                            <p className='text-xs md:text-sm lg:text-base truncate w-20 md:w-48 lg:w-52 text-center'>{file.name.startsWith('papercut-print-log-') ? file.name.slice(19) : file.name}</p>
                        </li>
                    ))}
                </ol>
                :
                state.gFiles.length > 0 ?
                    <p className='uppercase text-sm md:text-lg lg:text-2xl font-medium bg-red-300 border border-red-500 rounded-sm py-1 md:py-3 px-3 mx-14 text-center'>Carpeta Vacia</p>
                    :
                    <p className='uppercase text-sm md:text-lg lg:text-2xl font-medium bg-pantone-626 border border-pantone-627 text-white rounded-sm py-1 md:py-3 px-3 mx-14 text-center'>Cargando...</p>
            }
        </>
    )

}
