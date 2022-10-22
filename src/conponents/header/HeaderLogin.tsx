import { useContext } from "react";
import { Link } from 'react-router-dom'
import LoginIcon from "./LoginIcon"
import LogoutIcon from './LogoutIcon';
import { TodoContext } from "../../App";

export default function HeaderLogin(){
  const {isAuthorized, user} = useContext(TodoContext);
  let user_name = user.username || 'Logout';
  const name = isAuthorized[0]?user_name:'Login';
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    isAuthorized[1](false)
  }
  return (
    <div className='header-nav-login'>
      {
        !isAuthorized[0] ?
        <>
          <p>{name}</p><Link to={"/auth"}><LoginIcon /></Link>
        </>
          :
          <>
          <p>{name}</p><div onClick={logout}><LogoutIcon /></div>
        </>
      }
    </div>
  )
}