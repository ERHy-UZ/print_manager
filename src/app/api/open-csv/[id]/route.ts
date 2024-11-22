import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"
import { parse } from "papaparse";
import * as stream from 'stream'
import { promisify } from "util"

export async function GET(req: NextRequest) {

    const url = req.nextUrl.pathname
    const id = url.split('/')[3]

    if (!id) {
        return NextResponse.json({
            files: [{
                kind: 'NO SE PROPORCIONO ID',
                mimeType: 'ERROR',
                id: 'NI01',
                name: 'ERROR NI01'
            }]
        }, { status: 400 })
    }

    const data: string[][] = []

    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive']
    })

    const drive = google.drive({ version: 'v3', auth })

    const csv = await drive.files.get({
        fileId: id,
        alt: 'media'
    }, { responseType: 'stream' })

    const pipeline = promisify(stream.pipeline)
    const chunks: Buffer[] = []

    await pipeline(csv.data, new stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            chunks.push(chunk)
            callback()
        }
    }))

    const buffer = Buffer.concat(chunks)

    const csvString = buffer.toString()
    parse(csvString, {
        complete: function (results) {
            results.data.forEach(res => {
                data.push(res as string[])
            })
        }
    })

    return NextResponse.json(data)

}