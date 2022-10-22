import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useHttp } from "../hooks/fetch.hook";

/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Registration(){
  const { request } = useHttp();
  const [form, setForm] = useState({
    username:'',
    password: '',
    email: '',
  })
  const setName = (name: string) => form.username = name;
  const setEmail = (email: string) => form.email = email;
  const setPassword = (password: string) => form.password = password;
  
  const regHandler = async(event: React.MouseEvent) => {
    event.preventDefault();
    if(form.email && form.password){
      try {
        console.log(form)
        setForm(form)
        await request('auth/register', 'POST', JSON.stringify(form));
      } catch (e) {}
    }
  }
  return(
      <div className="auth">
      <div className="auth-form aut">
        <h1>Registration</h1>
        <div className="auth-input">
          <input placeholder="Name" type="text" onChange={(event) => setName(event.target.value)}></input>
          <input placeholder="Email" type="text" onChange={(event) => setEmail(event.target.value)}></input>
          <input placeholder="Password" type="text" onChange={(event) => setPassword(event.target.value)}></input>
        </div>
        <div className="auth-button">
          <a className="waves-effect blue accent-4 btn z-depth-3 pulse" onClick={regHandler}>Registred</a>
          <Link className="waves-effect grey darken-1 btn z-depth-1" to={'/auth/login'}>Login</Link>
        </div>
      </div>
    </div>
  )
}