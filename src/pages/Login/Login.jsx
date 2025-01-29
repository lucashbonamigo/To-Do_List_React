import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Functions/UserContext";
import usePost from "../../Functions/usePost";

export const logado = false;

const Login = () => {
  const urlLogin = "http://localhost:5000/Login";
  const [usuario, setUsuario] = useState("Luckkkkas");
  const [pass, setPass] = useState("SKOI7617");
  const { dataPost, httpConfigPost } = usePost(urlLogin);
  const Navigate = useNavigate(); 
  const {setUser, setLogged} = useContext(UserContext);
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    if (!usuario || !pass) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const user1 = {
      usuario,
      pass,
    };

    httpConfigPost(user1, "POST");
  };

  // Monitora o retorno da API
  if (dataPost) {
    if (dataPost.message === "Success") {
      setUser(dataPost);
      setLogged(true);
      Navigate('/')
    }
 }

  return (
    <div className="body">
      <form className="body" onSubmit={handleSubmit}>
        <input
          className="digitadd"
          placeholder="Usuário"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          className="digitadd"
          placeholder="Senha"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;