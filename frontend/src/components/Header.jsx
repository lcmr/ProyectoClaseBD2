
import fakeAuth from '../helpers/fakeAuth'
// import history from '../../helpers/history'
import { useHistory } from "react-router-dom";
export default function Header(params) {
    let history = useHistory();
    const handleSignOut = async () => {
        const response = await fetch('http://localhost:5000/logout',{
                    method: 'GET',
                    credentials: 'include',
                    // credentials: 'same-origin',
        })
        // fakeAuth.signout({})
        history.push('/')
    }
    return (
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {/* <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li> */}
                        {/* <li><a href="#" className="nav-link px-2 text-white">About</a></li> */}
                    </ul>

                    <div className="text-end">
                        <button type="button" onClick={handleSignOut} className="btn btn-outline-light me-2">Cerrar Sesion</button>
                        {/* <button type="button" className="btn btn-warning">Sign-up</button> */}
                    </div>
                </div>
            </div>
        </header>
    )

}