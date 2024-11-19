'use client'

import { parse } from "papaparse";
import { useManager } from "@/app/hooks/useManager";
import PrintResume from "@/components/PrintResume";
import { useEffect } from "react";

export default function TableData() {

    const { state, dispatch } = useManager()

    useEffect(() => {
        if (state.search_text && state.search_text.size > 5) {
            parse(state.search_text, {
                complete: function (results) {
                    dispatch({ type: 'set-records', payload: { records: results.data as string[][] } })
                }
            })
        }
    }, [state.search_text])


    return (
        <main className='border bg-egg-500 border-black mt-5 text-xs'>
            {state.records.length ?
                state.records[0][0] === 'PaperCut Print Logger - http://www.papercut.com/' ?
                    <>
                        <PrintResume records={state.records} />
                        <section className='overflow-x-auto border border-black m-5'>
                            <table>
                                <thead>
                                    <tr className='border-b border-orange-600 bg-orange-300'>
                                        {state.records[1].map((record, index) => (
                                            <th key={index} className='border-r border-orange-600 last-of-type:border-r-0 px-10 text-sm uppercase'>{record}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.records.filter((records, index) => index > 1).map((record, index) => (
                                        <tr key={index} className='border-b last-of-type:border-b-0 border-yellow-900 bg-egg-900 '>
                                            {record.map((item, index) => (
                                                <td key={index} className='border-r border-yellow-900 last-of-type:border-r-0 text-center py-1'>{item}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </>
                    :
                    <section className='flex w-full h-full justify-center items-center'>
                        <h1 className='uppercase text-2xl font-semibold bg-red-500 py-2 px-10 m-5 rounded-[3px]'>Archivo no valido</h1>
                    </section>
                :
                <section className='flex w-full h-full justify-center items-center'>
                    <h1 className='uppercase text-2xl font-semibold bg-red-500 py-2 px-10 m-5 rounded-[3px]'>Selecciona un archivo</h1>
                </section>
            }
        </main>
    )
}
