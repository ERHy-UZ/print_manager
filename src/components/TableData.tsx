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
            {records.length ?
                <table>
                    <thead>
                        <tr className='border-b border-black'>
                            {records[0].map((record, index) => (
                                <th key={index} className='border-r border-black last-of-type:border-r-0'>{record}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {records.filter((records, index) => index > 0).map((record, index) => (
                            <tr key={index} className='border-b last-of-type:border-b-0 border-black'>
                                {record.map((item, index) => (
                                    <td key={index} className='border-r border-black last-of-type:border-r-0'>{item}</td>
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
