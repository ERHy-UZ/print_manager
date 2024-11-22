'use client'

import { parse } from "papaparse";
import { useManager } from "@/app/hooks/useManager";
import PrintResume from "@/components/PrintResume";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa6";


export default function TableData() {

    const { state, dispatch } = useManager()

    const contentRef = useRef<HTMLElement>(null)
    const handlePrint = useReactToPrint({ contentRef, documentTitle: `Print_Log_${new Date().getTime()}` })

    useEffect(() => {
        if (state.search_text && state.search_text.size > 5) {
            parse(state.search_text, {
                complete: function (results) {
                    dispatch({ type: 'set-records', payload: { records: results.data as string[][] } })
                }
            })
        }
    }, [state.search_text, dispatch])

    const handleButtonPrint = () => {
        handlePrint()
    }

    return (
        <main ref={contentRef} className='relative border bg-egg-600 border-black mt-5 text-xs'>
            {state.records.length ?
                state.records[0][0] === 'PaperCut Print Logger - http://www.papercut.com/' ?
                    <>
                        <PrintResume records={state.records} />
                        <section className='overflow-x-auto border border-black m-5'>
                            <table>
                                <thead>
                                    <tr className='border-b border-pantone-7421 bg-pantone-7420'>
                                        {state.records[1].map((record, index) => (
                                            <th key={index} className='border-r border-black last-of-type:border-r-0 px-8 text-sm uppercase text-white'>{record}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.records.filter((records, index) => index > 1).map((record, index) => (
                                        <tr key={index} className='border-b last-of-type:border-b-0 border-yellow-900 bg-pantone-468'>
                                            {record.map((item, index) => (
                                                <td key={index} className='border-r border-yellow-900 last-of-type:border-r-0 text-center py-1'>{item}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                        <button className='absolute top-5 left-full bg-pantone-7420 hover:bg-pantone-7421 text-2xl text-pantone-468 px-2 hover:px-3 py-1 rounded-r-md border border-black' onClick={handleButtonPrint} >
                            <FaPrint />
                        </button>
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
