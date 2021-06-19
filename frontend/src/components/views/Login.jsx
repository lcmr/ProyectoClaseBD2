import { useState } from "react"
import fakeAuth from '../../helpers/fakeAuth'
// import history from '../../helpers/history'
import { useHistory } from "react-router-dom";

const styles = {
    main: {
        width: '200px',
    }
}
function Login (){
    let history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(email && password){
            setLoading(true)
            fakeAuth.authenticate({})
            history.push('/dashboard')
        }
        console.log(e)
    }
    return (
        <div className="d-flex justify-content-md-center align-items-center vh-100" >
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-6 align-self-center">
                        <div className="card p-4 ">
                            <div className="card-header">
                                Iniciar Sesion
                            </div>
                            <div className="card-body">
                                <form action="" className="" onSubmit={handleSubmit}>
                                    <div className="form-control">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                    </div>
                                    <button className="btn btn-primary" type="submit">Iniciar Sesion</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Login}