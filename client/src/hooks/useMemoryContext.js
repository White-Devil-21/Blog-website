import { MemoryContext } from "../context/memoryContext";
import { useContext } from "react";

export const useMemoryContext = () =>{
    const context = useContext(MemoryContext)

    if(!context){
        throw Error("outside context provider")
    }
    return context
}