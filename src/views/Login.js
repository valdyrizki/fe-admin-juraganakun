import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getServerIP } from '../Component/Helpers';
import { showError, showSuccess } from '../Component/Template/Msg';
import { useRecoilState,useSetRecoilState } from "recoil";
import { authAtom, tokenAtom, userAtom } from '../store/user';

function Login(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const history = useHistory()

    const [auth,setAuth] = useRecoilState(authAtom)
    const setUser = useSetRecoilState(userAtom)
    const setToken = useSetRecoilState(tokenAtom)

    useEffect(() => {
        console.log(auth);
        if(auth != null){
            history.push("/home")
        }
    },[])
    
    const loginHandler = async (e) =>{
        e.preventDefault()
        
        try{
            let response = await axios.post(`${getServerIP()}/auth/login`,
            {
                "email":email,
                "password":password
            });
            let data = response.data
            console.log(response);
            if(data.isSuccess){
                showSuccess("Login Successfully");
                //set localstorage
                localStorage.setItem('user', JSON.stringify(data.data));
                localStorage.setItem('auth', 
                    JSON.stringify({
                        isAuth : true,
                        authDate : new Date()
                    })
                );
                localStorage.setItem('token', JSON.stringify(data.token.trim()));

                //set atom
                setAuth({
                    isAuth : true,
                    authDate : new Date()
                })
                setUser(data.data)
                setToken(data.token.trim())
                history.push("/home") 
            }else{
                showError(data.msg)
            }
        }catch(e){
            showError(e.message)
            console.log(e.message);
        }
    }

    document.body.style = 'background: #E9ECEF;';
    return (
        <div className='container'>
            <div className='row justify-content-center align-items-center vh-100'>
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                        <NavLink to="/home" className="h1"><b>Admin</b>LTE</NavLink>
                        </div>
                        <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={loginHandler}>
                            <div className="input-group mb-3">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                            </div>
                            <div className="input-group mb-3">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label>
                                    Remember Me
                                </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                            </div>
                        </form>

                        <div className="social-auth-links text-center mt-2 mb-3">
                            <NavLink to="/fb" className="btn btn-block btn-primary">
                            <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                            </NavLink>
                            <NavLink to="/google" className="btn btn-block btn-danger">
                            <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                            </NavLink>
                        </div>

                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Register a new membership</a>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;