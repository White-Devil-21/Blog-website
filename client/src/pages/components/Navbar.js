import { Link } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"

const Navbar = () =>{
    const logout = useLogout()
    const {user} = useAuthContext()

    const handleClick = () =>{
        logout()
    }

    return(
        <div className="bg-dark">
            <header className="row ms-5">
                <Link className="text-decoration-none col ms-5" to="/" >
                    <h1 className="text-center mt-4 mb-5 display-2" >Personal pager</h1>
                </Link>
                {!user && (
                    <div className="col-3 mt-5">
                        <Link className="ms-5" to="/signup" ><button className="btn btn-primary fs-4">Sign Up</button></Link>
                        <Link className="ms-5" to="/login" ><button className="btn btn-primary fs-4">Login</button></Link>
                    </div>
                )}
                {user && (
                    <div className="col-4 row ms-5">
                        <span className="col mt-5 fs-3 ms-5 text-danger">{user.email}</span>
                        <div className=" mt-5 me-1 col">
                            <button className="btn btn-primary fs-4" onClick={handleClick}>Log Out</button>
                        </div>
                    </div>
                )}
            </header> 
        </div>
    )
}

export default Navbar  