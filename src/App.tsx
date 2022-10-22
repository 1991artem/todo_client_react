import React, { createContext, useState } from 'react';
import Footer from './conponents/footer/Footer';
import Header from './conponents/header/Header';
import { IContext } from './conponents/interface';
import Routing from './conponents/Routing';

export const TodoContext = createContext({} as IContext);

function App() {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const user = {
    admin: false,
    username: '',
    userId: '0',
  };

  if(localStorage.getItem('user')){
    user.admin = JSON.parse(localStorage.getItem('user') as string)?.admin;
    user.username = JSON.parse(localStorage.getItem('user') as string)?.username;
    user.userId = JSON.parse(localStorage.getItem('user') as string)?.admiuserIdn;
  }

  const todosContext: IContext = ({
    isAuthorized: [isAuthorized, setIsAuthorized],
    user: user,
  })

  return (
    <TodoContext.Provider value={todosContext}>
    <div className='wrapper'>
      <Header />
      <Routing isAuthorized={isAuthorized} admin={user.admin}/>
      <Footer />
    </div>
    </TodoContext.Provider>

  );
}

export default App;
