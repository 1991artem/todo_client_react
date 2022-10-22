import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { TodoContext } from "../../App";
import { useHttp } from "../hooks/fetch.hook";
import { IContext } from "../interface";

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Login(){
  let navigate = useNavigate();
  const { request, error, clearError } = useHttp();
  const {isAuthorized}: IContext = useContext(TodoContext)
  const [form, setForm] = useState({
    password: '',
    email: '',
  })
  useEffect(() => {
    clearError()
  }, [error, clearError])
  const setEmail = (email: string) => form.email = email;
  const setPassword = (password: string) => form.password = password;
  console.log(localStorage.getItem('user'));
  const logHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    if(form.email && form.password){
      try {
        setForm(form)
        await request('auth/login', 'POST', JSON.stringify(form));
        navigate('/');
      } catch (e) {}
    }
  }
  return(
    <>
      { 
      !isAuthorized[0] ?
      <div className="auth">
      <div className="auth-form login">
        <h1>Login</h1>
        <div className="auth-input">
          <input placeholder="Email" type="text" onChange={(event) => setEmail(event.target.value)}></input>
          <input placeholder="Password" type="text" onChange={(event) => setPassword(event.target.value)}></input>
        </div>
        <div className="auth-button">
        <Link className="waves-effect grey darken-1 btn z-depth-1" to={'/auth/register'}>Registred</Link>
          <a className="waves-effect blue accent-4 btn z-depth-3 pulse" onClick={logHandler}>Login</a>
        </div>
      </div>
    </div>
    :
    <Navigate to="/" replace />
    }
    </>
  )
}



