import { useState } from "react"
import fakeAuth from '../../helpers/fakeAuth'
// import history from '../../helpers/history'
import { useHistory } from "react-router-dom";
function Login (){
    let history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(email && password){
            // try {
            //     const response = await fetch('http://localhost:5000/login',{
            //         method: 'POST',
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({nombreUsuario: email, password})
            //     })
            //     console.log(response.headers);
            // } catch (error) {
            //     console.error(error)                
            // }
            fakeAuth.authenticate({})
            history.push('/dashboard')
        }
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
                                        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
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