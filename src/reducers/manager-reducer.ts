import { GDriveFileType } from "@/types"

export type ManagerActions =
    { type: 'set-search-text', payload: { search: File | null } } |
    { type: 'set-files', payload: { files: GDriveFileType[] } } |
    { type: 'set-selected-file', payload: { file: string } }

export type ManagerState = {
    search_text: File | null
    gFiles: GDriveFileType[]
    selectedFile: string
}

export const initialState: ManagerState = {
    search_text: typeof window !== "undefined" ? new File(['empty'], 'Seleccione CSV...') : null,
    gFiles: [],
    selectedFile: ''
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

    return state
}