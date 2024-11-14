import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export async function GET() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive']
    })

    const drive = google.drive({ version: 'v3', auth })
    const files = await drive.files.list({
        q: 'trashed: False'
    })

    return NextResponse.json({
        files: files.data.files?.filter(file => file.mimeType === 'application/vnd.google-apps.folder')
    })
}

