import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Functions/UserContext";
import usePost from "../../Functions/usePost";
import { Box, Input, Flex, Heading, Button } from "@chakra-ui/react";

export const logado = false;

const Login = () => {
  const urlLogin = "https://api-todo-ckia.onrender.com/Login";
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const { dataPost, httpConfigPost } = usePost(urlLogin);
  const Navigate = useNavigate();
  const { setUser, setLogged } = useContext(UserContext);

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
    <Box w={'500px'} mx={'auto'} mt={'50px'}>
          <Heading size={'3xl'} textAlign={'center'}>Faça login e registre suas tarefas agora mesmo!</Heading>
      <form onSubmit={handleSubmit}>
        <Flex w={'100%'} direction={'column'} mt={'50px'}>
          <Input
            pl={'.5em'}
            variant={'outline'}
            placeholder="Usuário"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <Input
            pl={'.5em'}
            mt={'1em'}
            variant={'outline'}
            placeholder="Senha"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <Flex w={'100%'} justify={'flex-end'}>
          <Button pl={'7px'} background={'gray'} mr={'5px'} mt={'.5em'} w={'90px'} onClick={()=>Navigate('/Cadastro')} >Cadastrar</Button>
          <Input type="submit" pl={'7px'} background={'lightgreen'} mt={'.5em'} value={'Login'} w={'50px'} />
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default Login;