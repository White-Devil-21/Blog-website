import { useState } from "react"
import { useMemoryContext } from "../../hooks/useMemoryContext"
import Button from 'react-bootstrap/Button'
import { useAuthContext } from "../../hooks/useAuthContext"

const MemoryForm = () =>{
    const { dispatch } = useMemoryContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!user){
            setError("User not logged in")
            return
        }

        const memory = {date, title, content}

        const response = await fetch('/api/memories', {
            method: 'POST',
            body: JSON.stringify(memory),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }) 

        const json = await response.json()

        if(!response){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            setContent('')
            setDate('')
            setTitle('')
            dispatch({type: 'CREATE_MEMORY', payload: json})
            console.log("Today is added ", json)
        }

    }

    return(
        <div className="container mt-4 text-light p-2">
            <h3 className="formHead mb-4" style={{ margin: 0 }} >How's your day ? </h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group fs-5">
                    <label >Day : </label>
                    <input className="form-control mt-2" 
                     type="text" 
                     onChange={(e) => setDate(e.target.value)} 
                     value={date} 
                    />
                </div>

                <div className="form-group mt-4 fs-5">
                    <label>Title : </label>
                    <input className="form-control mt-2" 
                     type="text" 
                     onChange={(e) => setTitle(e.target.value)} 
                     value={title} 
                    />
                </div>

                <div className="form-group mt-4 fs-5">
                    <label>What happened today ?</label>
                    <textarea className="md-textarea form-control mt-2" 
                     type="text" rows="7"
                     onChange={(e) => setContent(e.target.value)} 
                     value={content} 
                    />
                </div>
                
                <Button type="submit" className="mt-5 fs-5" >Add Today</Button>
                {error && <div className="error">{error}</div> }
            </form>
        </div>
    )
}

export default MemoryForm