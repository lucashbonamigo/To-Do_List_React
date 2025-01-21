import { useState } from "react"
import { useFetch } from "../../Functions/useFetch"

export const logado = false

const Login = () => {

  const urlLogin = 'http://localhost:5000/Login'

    const [usuario, setUsuario] = useState("");
    const [pass, setPass] = useState("");
    const {data, httpconfig} = useFetch(urlLogin);
   
    const user = {
      usuario,
      pass
    }
    httpconfig(user, "POST")

    const verificarUser = ()=>{
      if(usuario === data.usuario & pass === data.pass){
        alert('Deve Logar')
      }
    }

    return (
    <div className="body">
      <form className="body">
        <input className="digitadd" placeholder="Usuário" type="text" value={usuario} onChange={(e)=>{setUsuario(e.target.value)}}/>
        <input className="digitadd" placeholder="Senha" type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        <input type="submit" onClick={"validarLogin"}/>
        <button onClick={verificarUser()}>criar conta</button>
      </form>
    </div>
  )
}

export default Login
