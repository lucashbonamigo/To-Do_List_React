
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import { useContext } from 'react';
import { UserContext } from '../context/NotificationContext';
import { Toaster, toaster } from '../components/ui/toaster';

function AppRoutes() {
  const { title, description, type, token } = useContext(UserContext)

  // toaster.create({
  //   title: title,
  //   description: description,
  //   type: type,
  //   duration: 3000,
  // });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={token ? <Home /> : <Login />} />
          <Route path='/login' element={token ? <Home /> : <Login />} />
          <Route path='/*' element={token ? <Home /> : <Login />} />
          <Route path='/Cadastro' element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default AppRoutes
