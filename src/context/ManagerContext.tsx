'use client'

import { initialState, ManagerActions, managerReducer, ManagerState } from "@/reducers/manager-reducer"
import { createContext, Dispatch, ReactNode, useReducer } from "react"

type ManagerContextProps = {
    state: ManagerState
    dispatch: Dispatch<ManagerActions>
}

type ManagerProviderProps = {
    children: ReactNode
}

export const ManagerContext = createContext<ManagerContextProps>(null!)

export default function ManagerProvider({ children }: ManagerProviderProps) {

    const [state, dispatch] = useReducer(managerReducer, initialState)

    return (
        <ManagerContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </ManagerContext.Provider>
    )
}
