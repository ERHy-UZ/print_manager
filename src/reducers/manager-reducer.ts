
export type ManagerActions =
    { type: 'set-search-text', payload: {search: File} }

export type ManagerState = {
    search_text: File
}

export const initialState: ManagerState = {
    search_text: new File(['empty'], 'Ingrese CSV...')
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

    return state
}