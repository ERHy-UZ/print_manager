
type PrintResumeProps = {
    records: string[][]
}

export default function PrintResume({ records }: PrintResumeProps) {

    const index = 1

    const usrIndex = records[index].findIndex(record => record == 'Usuario')
    const usrName = records[index + 1][usrIndex]
    const pagIndex = records[index].findIndex(record => record == 'P�ginas')
    const copIndex = records[index].findIndex(record => record == 'Copias')

    const printedPages = records.reduce((total, record) => total + ((parseInt(record[pagIndex]) ? parseInt(record[pagIndex]) : 0) * (parseInt(record[copIndex]) ? parseInt(record[copIndex]) : 0)), 0)

    return (
        <section className='grid grid-cols-2 border border-pantone-7421 bg-pantone-7420 rounded-sm m-3 md:m-5 text-base sm:text-xl lg:text-2xl text-white uppercase py-5 sm:py-7 lg:py-10'>
            <p className='flex justify-center'>{usrName}</p>
            <p className='flex justify-center'>{printedPages ? `${printedPages} ${printedPages > 1 ? 'hojas' : 'hoja' }` : 'error al contar  '}</p>
        </section>
    )
}
