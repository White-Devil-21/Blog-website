import { useMemoryContext } from "../../hooks/useMemoryContext"
import { useAuthContext } from "../../hooks/useAuthContext"

const MemoryDets = ({memory}) =>{
    const {dispatch} = useMemoryContext()
    const {user} = useAuthContext()

    const deleteElement = async () =>{

        if(!user){
            return
        }
        const response = await fetch('/api/memories/' + memory._id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_MEMORY', payload: json})
        }
    }

    return(
        <div className="container mt-4 border rounded p-5 bg-dark text-light bg-gradient">
            <h3 className="text-center mb-3">{memory.title}</h3>
            <p className="mb-3 font-italic">{memory.date}</p>
            <p className="font-weight-bold" >{memory.content}</p>
            <button className="btn btn-primary mt-3" onClick={deleteElement} >Delete</button>

        </div>
    )
}

export default MemoryDets