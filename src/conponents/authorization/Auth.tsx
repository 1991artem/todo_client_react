import { Link } from 'react-router-dom'

export default function Auth(){
  return(
      <div className="auth">
      <div className="auth-form">
        <h1>Hello my friend</h1>
        <div className="auth-button">
          <Link className="waves-effect waves-light btn z-depth-3" to={'/auth/register'}>Registred</Link>
          <Link className="waves-effect waves-light btn z-depth-3" to={'/auth/login'}>Login</Link>
        </div>
      </div>
    </div>
  )
}