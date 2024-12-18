'use client'

import { useManager } from "@/app/hooks/useManager";
import { useMemo } from "react";
import { FaCalendarAlt, FaClock, FaGlobe, FaFile } from "react-icons/fa";

type csvIconFileType = {
    fileName: string
    fileId: string
}

export function CsvFileIcon({ fileName, fileId }: csvIconFileType) {

    const { state, dispatch } = useManager()
    const newFileName = fileName.startsWith('papercut-print-log-') ? fileName.slice(19) : '-string-default-'

    const isSelected = useMemo(() => state.selectedCSV === fileId, [state.selectedCSV, fileId])

    const handleDoubleClick = () => {
        if (!isSelected) {
            dispatch({ type: 'set-selected-csv', payload: { csv: fileId } })
        }
    }


    switch (newFileName.length) {
        case 11:
            return <FaCalendarAlt className={`text-[4rem] md:text-[5rem] ${isSelected ? 'text-pantone-626' : 'text-blue-500 hover:text-blue-400 cursor-pointer'}`} onDoubleClick={handleDoubleClick} />
        case 14:
            return <FaClock className={`text-[4rem] md:text-[5rem] ${isSelected ? 'text-pantone-626' : 'text-blue-500 hover:text-blue-400 cursor-pointer'}`} onDoubleClick={handleDoubleClick} />
        case 12:
            return <FaGlobe className={`text-[4rem] md:text-[5rem] ${isSelected ? 'text-pantone-626' : 'text-blue-500 hover:text-blue-400 cursor-pointer'}`} onDoubleClick={handleDoubleClick} />
        default:
            return <FaFile className={`text-[4rem] md:text-[5rem] ${isSelected ? 'text-pantone-626' : 'text-blue-500 hover:text-blue-400 cursor-pointer'}`} onDoubleClick={handleDoubleClick} />
    }

}
