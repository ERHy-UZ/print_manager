'use client'

import { parse } from "papaparse";
import { useManager } from "@/app/hooks/useManager";
import { useState, useEffect } from "react";

export default function TableData() {

    const [records, setRecords] = useState<string[][]>([])

    const { state } = useManager()

    useEffect(() => {
        if (state.search_text.size > 5) {
            parse(state.search_text, {
                complete: function (results) {
                    console.log(results.data)
                    setRecords(results.data as string[][])
                }
            })
        }
    }, [state.search_text])

    return (
        <main className='border bg-egg-500 border-black mt-5 text-xs overflow-x-auto'>
            { state.search_text.size > 5 ?
                <table>
                    <thead>
                        {records.map((record, index) => (
                            <tr key={index} className='border-b border-black'>
                                {index === 0 &&
                                    record.map((item, index) => (
                                        <th key={index} className='border-r border-black'>{item}</th>
                                    ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {records.map((record, index) => (
                            <tr key={index} className='border-b border-black'>
                                {index !== 0 &&
                                    record.map((item, index) => (
                                        <td key={index} className='border-r border-black'>{item}</td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <h1 className='uppercase'>seleccione un archivo primero</h1>
            }
        </main>
    )
}
