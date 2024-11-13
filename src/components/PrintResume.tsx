
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
        <section className='grid grid-cols-2 border border-orange-600 bg-orange-300 rounded-sm m-5 text-2xl uppercase py-10'>
            <p className='flex justify-center'>{usrName}</p>
            <p className='flex justify-center'>{printedPages ? `${printedPages} hojas` : 'error al contar  '}</p>
        </section>
    )
}
