
export type ManagerActions =
    { type: 'set-search-text', payload: {search: File | null} }

export type ManagerState = {
    search_text: File | null
}

export const initialState: ManagerState = {
    search_text: typeof window !== "undefined" ? new File(['empty'], 'Seleccione CSV...') : null
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