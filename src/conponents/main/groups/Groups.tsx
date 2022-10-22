import { useContext, useEffect, useState } from 'react';
import { TodoContext } from '../../../App'
import { useHttp } from "../../hooks/fetch.hook";
import { Link, Navigate } from "react-router-dom";
import { IGroup } from "../../interface";
import Group from "./Group";
import { Loading } from "../../Loading";


export default function Groups() {
  const { isLoaded, request, error } = useHttp();
  const [groups, setGroups] = useState([])
  const { isAuthorized, user} = useContext(TodoContext)
  const token = JSON.parse(localStorage.getItem('user') as string).token;

  useEffect(() => {
    request('/groups', 'GET', null, {
      Authorization: `Bearer ${token}`
    }).then(response => setGroups(response))
  }, [request, token])

  if (error) {
    return <Loading />;
  } else if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <>
        {
          isAuthorized[0] ?
            <>
              {user.admin ?
              <div className='create'>
                <Link to={'/group/create'}><i className="medium material-icons z-depth-3">playlist_add</i> </Link>
              </div>
              : 
              <h1 className='title'>Chose group &#128071;</h1>}
              <div className="main">

                {
                  groups.map((group: IGroup) => {
                    return <Group group={group} key={group._id} />
                  })
                }
              </div>
            </>

            :
            <Navigate to="/" replace />
        }
      </>

    )
  }
}