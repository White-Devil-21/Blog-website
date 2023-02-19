import { useAuthContext } from "./useAuthContext"
import { useMemoryContext } from "./useMemoryContext"

export const useLogout = () =>{
    const {dispatch} = useAuthContext()
    const {dispatch: memoryDispatch} = useMemoryContext()
    const logout = ()=>{
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        memoryDispatch({type: 'SET_MEMORY', payload: null})
    }
    return logout
}