import { parse } from "csv";
import fs from 'node:fs'

export default async function CsvRecord() {

    const processFile = async (): Promise<string[][]> => {
        const records = []
        const parser = fs
            .createReadStream(`public/papercut.csv`)
            .pipe(parse({
                // CSV options if any
            }));
        for await (const record of parser) {
            // Work with each record
            records.push(record);
        }
        return records
    }

    const records = await processFile()

    return (
        <table className='border bg-egg-500 border-black mt-5 text-xs'>
            <thead>
                <tr>
                    {records[0].map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {records.map((record, index) => (
                    index !== 0 &&
                    <tr key={index}>
                        {record.map((item, index) => (
                            <td key={index}>{item}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
