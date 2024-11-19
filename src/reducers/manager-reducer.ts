import { GDriveFileType } from "@/types"

export type ManagerActions =
    { type: 'set-search-text', payload: { search: File | null } } |
    { type: 'set-files', payload: { files: GDriveFileType[] } } |
    { type: 'set-selected-file', payload: { file: string } } |
    { type: 'set-selected-csv', payload: { csv: string } } |
    { type: 'set-records', payload: {records: string[][]}}
    

export type ManagerState = {
    search_text: File | null
    gFiles: GDriveFileType[]
    selectedFile: string
    selectedCSV: string
    records: string[][]
}

export const initialState: ManagerState = {
    search_text: typeof window !== "undefined" ? new File(['empty'], 'Seleccione CSV...') : null,
    gFiles: [],
    selectedFile: '',
    selectedCSV: '',
    records: []
}

export const managerReducer = (
    state: ManagerState = initialState,
    action: ManagerActions
) => {

    if (action.type === 'set-search-text') {

        return {
            ...state,
            search_text: action.payload.search
        }
    }

    if (action.type === 'set-files') {

        return {
            ...state,
            gFiles: action.payload.files
        }
    }

    if (action.type === 'set-selected-file') {

        return {
            ...state,
            selectedFile: action.payload.file
        }
    }

    if (action.type === 'set-selected-csv') {

        return {
            ...state,
            selectedCSV: action.payload.csv
        }
    }

    if (action.type === 'set-records') {

        return {
            ...state,
            records: action.payload.records
        }
    }

    return state
}