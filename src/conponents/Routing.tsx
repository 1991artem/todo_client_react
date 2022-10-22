import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./authorization/Auth";
import Groups from "./main/groups/Groups";
import Login from './authorization/Login';
import Registration from './authorization/Registration';
import GroupForm from "./main/groups/GroupForm";

interface IRouting {
  isAuthorized: boolean;
  admin: boolean;
}

export default function Routing({isAuthorized, admin}: IRouting){
  return(
    <Routes>
    <Route 
    path='/' 
    element={isAuthorized ? <Navigate to="/groups" replace /> : <Navigate to="/auth" replace />}
    />
    <Route 
    path='/auth' 
    element={<Auth />}
    />
    <Route 
    path='/groups' 
    element={isAuthorized ? <Groups /> : <Navigate to="/auth" replace />}
    />
    <Route 
    path='/auth/login' 
    element={<Login />}
    />
    <Route 
    path='/auth/register' 
    element={<Registration />}
    />
    {
    admin ? <>
            <Route 
        path='/group/create' 
        element={<GroupForm />}
        />
    </> : null
    }
    <Route 
    path='*' 
    element={<Navigate to="/" replace />}
    />
  </Routes>
  )
}