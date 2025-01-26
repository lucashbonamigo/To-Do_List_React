import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Provider } from "./components/ui/provider.jsx";
import Cadastro from './pages/Cadastro/Cadastro';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Login />} />
          <Route path='/Cadastro' element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
