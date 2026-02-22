
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import { getLocalStorage } from './storage/localstorage';
import { useContext } from 'react';
import { UserContext } from '../context/NotificationContext';
import { Toaster, toaster } from '../components/ui/toaster';

function AppRoutes() {
  const Token = getLocalStorage('token');
  const { title, description, type} = useContext(UserContext)

  toaster.create({
    title: title,
    description: description,
    type: type,
    duration: 3000,
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={Token ? <Home /> : <Login />} />
          <Route path='/login' element={Token ? <Home /> : <Login />} />
          <Route path='/*' element={Token ? <Home /> : <Login />} />
          <Route path='/Cadastro' element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default AppRoutes
