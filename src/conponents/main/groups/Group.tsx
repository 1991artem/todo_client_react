import { IGroup } from "../../interface";
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../../App';
import { useHttp } from "../../hooks/fetch.hook";


interface IGroupCard{
  group: IGroup;
}

export default function Group({group}: IGroupCard){
  const [edit, setEdit] = useState(false);
  const { user } = useContext(TodoContext);
  const { request, error, clearError } = useHttp();
  let navigate = useNavigate();
  const [info, setInfo] = useState({
    name: group.name,
    description: group.description,
  });

  useEffect(() => {
    clearError()
  }, [error, clearError])

  const token = JSON.parse(localStorage.getItem('user') as string).token;
  const create = new Date(group.create);
  const setName = (name: string) => info.name = name;
  const setDescription = (description: string) => info.description = description;
  const editInfo = () => {
    setEdit((prev)=>!prev);
  }
  const saveEdit = async () => {
    try {
    if(info.name){
      setEdit((prev)=>!prev);
      if((info.name !== group.name) || (info.description !== group.description)){
          setInfo(info)
          await request(`group/${group._id.toString()}`, 'PATCH', JSON.stringify(info), {
            Authorization: `Bearer ${token}`
          });
          navigate('/');
      }
    }
  } catch (e) {
  }
  }
  const deleteGroup = async() => {
      try {
        await request(`group/${group._id.toString()}`, 'DELETE', null, {
          Authorization: `Bearer ${token}`
        });
        navigate('/');
      } catch (e) {
      }
  }
  return(
    <div className="group-card z-depth-2">
      <div className="group-name">
      {edit ? <input defaultValue={info.name} onChange={(event) => setName(event.target.value)}></input> : <p>{info.name}</p>}
        
        {
        user.admin ? 
        <>
        {
        edit ? 
          <i className="material-icons" onClick={saveEdit}>done_all</i>
          :
          <i className="material-icons" onClick={editInfo}>edit</i>
        }
          <i className="material-icons" onClick={deleteGroup}>delete</i>
        </>
        :
        null
        }
      </div>
      <div className="group-description z-depth-0">
        {edit ? <textarea defaultValue={info.description} onChange={(event) => setDescription(event.target.value)}></textarea> : <p>{info.description}</p>}
      </div>
      <div className="group-card-footer">
      <div className="group-counter">
        <p>Users in group: {group.users}</p>
      </div>
      <div className="group-created">
        <p>Created: {`${create.getFullYear()}-${create.getMonth()}-${create.getDate()}`}</p>
      </div>
      </div>
    </div>
  )
}
