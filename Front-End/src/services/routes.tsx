
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import { useContext } from 'react';
import { UserContext } from '../context/NotificationContext';
import Notification from '../components/Notification/Notification';
import Account from '../pages/Account/Account';


function AppRoutes() {
  const { title, description, type, token } = useContext(UserContext)


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={token ? <Home /> : <Login />} />
          <Route path='/login' element={token ? <Home /> : <Login />} />
          <Route path='/*' element={token ? <Home /> : <Login />} />
          <Route path='/Cadastro' element={<Cadastro />} />
          <Route path='/account' element={token ? <Account /> : <Login/>}/>
        </Routes>
        <Notification title={title} description={description} type={type}/>
      </BrowserRouter>
      
    </>
  );
}

export default AppRoutes
