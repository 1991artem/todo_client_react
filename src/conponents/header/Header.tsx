import { useContext } from "react";
import Icon from "./Icon";
import Nav from "./Nav";
import { TodoContext } from '../../App';

export default function Header(){
  const {user} = useContext(TodoContext);
  return(
    <div className="header z-depth-2">
      <Icon />
      {user.admin ? <h3 className="boss-title">Hello, boss</h3>: null}
      <Nav />
    </div>
  )
}