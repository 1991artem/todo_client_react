import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/fetch.hook";
import { useNavigate } from 'react-router-dom';

export default function GroupForm(){
  let navigate = useNavigate();
  const { request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    name: '',
    description: '',
  })
  const token = JSON.parse(localStorage.getItem('user') as string).token;

  useEffect(() => {
    clearError()
  }, [error, clearError])
  const setName = (name: string) => form.name = name;
  const setDescription = (description: string) => form.description = description;
  const buttonHandler = async () => {
    if(form.name){
      try {
        setForm(form)
        await request('group/create', 'POST', JSON.stringify(form), {
          Authorization: `Bearer ${token}`
        });
        navigate('/');
      } catch (e) {
      }
    }
  }
  return(
    <div className="group-form">
          <input placeholder="  Group name" type="text" onChange={(event) => setName(event.target.value)}></input>
          <textarea placeholder="Description" onChange={(event) => setDescription(event.target.value)}></textarea>
          <button className="waves-effect blue accent-4 btn z-depth-1" onClick={buttonHandler}>CREATE</button>
    </div>
  )
}