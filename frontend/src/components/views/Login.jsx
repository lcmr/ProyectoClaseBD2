import { useState } from "react"
import axios from 'axios';
import fakeAuth from "../../helpers/fakeAuth";

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
            //     // const instance = axios.create({
            //     //     baseURL: 'http://localhost:5000/',
            //     //     timeout: 1000,
            //     //     withCredentials: true,
            //     //     credentials: 'same-origin',
            //     //     mode: 'no-cors',
            //     //     transformRequest: [(data) => JSON.stringify({nombreUsuario: email, password})],
            //     //     headers: {
            //     //         'Accept': 'application/json',
            //     //         'Content-Type': 'application/json',
            //     //     }

            //     // });
            //     // const response = await instance.post('login');
            //     const response = await fetch('http://localhost:5000/login',{
            //         method: 'POST',
            //         headers: {
            //             Accept: 'application/json',
            //             'Content-Type': 'application/json',
            //         },
            //         credentials: 'same-origin',
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
                                <form action="" className="" autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="form-control">
                                        <label htmlFor="email">Email</label>
                                        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="password">Password</label>
                                        <input autoComplete="off" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                    </div>
                                    <button autoComplete="off" className="btn btn-primary" type="submit">Iniciar Sesion</button>
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