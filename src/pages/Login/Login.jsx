import { useState } from "react";
import { useFetch } from "../../Functions/useFetch";
import { useNavigate } from "react-router-dom";

export const logado = false;

const Login = () => {
  const urlNewUser = "http://localhost:5000/newUser";
  const urlLogin = "http://localhost:5000/Login";

  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const { data, httpConfig } = useFetch(urlLogin);
  const Navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    if (!usuario || !pass) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const user = {
      usuario,
      pass,
    };

    // Configura a requisição POST usando o hook
    httpConfig(user, "POST");
  };

  // const createUser = (e) => {
  //   e.preventDefault();
  //   if (!usuario || !pass) {
  //     alert("Por favor, preencha todos os campos.");
  //     return;
  //   };
  //   const user = {
  //     usuario,
  //     pass,
  //   };
  //   httpConfig(user, "PUT");
  // };

  // Monitora o retorno da API
  if (data) {
    if (data.message === "Success") {
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