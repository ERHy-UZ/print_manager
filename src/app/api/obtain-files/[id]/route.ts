import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET(req: NextRequest, context: { params: { id: string } }) {

    const { id } = await context.params

    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive']
    })

    const drive = google.drive({ version: 'v3', auth })
    const files = await drive.files.list({
        q: `'${id}' in parents`
    })

    return NextResponse.json({
        files: files.data.files && files.data.files.length > 0 ? files.data.files : [{ kind: 'undef', mimeType: 'undef', id: 'undef', name: 'undef' }]
    })
}
