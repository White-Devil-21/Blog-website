import { useEffect } from "react"
import { useMemoryContext } from "../hooks/useMemoryContext"
import { useAuthContext } from "../hooks/useAuthContext"
import MemoryDets from "./components/MemoryDets"
import MemoryForm from "./components/MemoryForm"

const Home = () =>{
    const {memories, dispatch} = useMemoryContext()
    const {user} = useAuthContext()

    useEffect(() =>{
        const fetchMemories = async() =>{
            const response = await fetch('/api/memories', {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: "SET_MEMORY", payload: json})
            }
        }

        if(user){
            fetchMemories()
        }

    }, [dispatch, user])

    return(
        <div className="container">
            <div className="row">
                <div className="col-sm-7 my-4" >
                    {memories && memories.map((memory)=>(
                        <MemoryDets key={memory._id} memory={memory} />

                    ))}
                </div>
                <div className="col-sm-1"></div>
                <div className="col-sm-4 " ><MemoryForm /></div> 
            </div>
        </div>

    )
}

export default Home