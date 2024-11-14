import { NextRequest, NextResponse } from "next/server"

type ResponseData = {
    message: string
}

export async function GET(): Promise<NextResponse<ResponseData>> {

    const data: ResponseData = {
        message: 'hola del otro lado'
    }

    return NextResponse.json(data)
}
