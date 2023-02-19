import { createContext, useReducer } from "react";

export const MemoryContext = createContext()

export const MemoryReducer = (state, action) =>{
    switch(action.type){
        case "SET_MEMORY":
            return{
                memories: action.payload
            }
        case "CREATE_MEMORY":
            return{
                memories: [action.payload, ...state.memories]
            }
        case "DELETE_MEMORY":
            return{
                memories: state.memories.filter((w)=> w._id !== action.payload._id )
            }
        default:
            return state
    }
}

export const MemoryContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(MemoryReducer, {
        memories: null
    })

    return(
        <MemoryContext.Provider value={{...state, dispatch}} >
            {children}
        </MemoryContext.Provider>
    )
}