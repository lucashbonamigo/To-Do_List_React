import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Functions/UserContext";
import usePost from "../../Functions/usePost";
import { Box, Input, Flex, Heading, Button, Text, ProgressCircle } from "@chakra-ui/react";
import LoginInput from '../../components/LoginInput.jsx'

export const logado = false;

const Login = () => {
  const urlLogin = "https://api-todo-ckia.onrender.com/Login";
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const { dataPost, httpConfigPost, loading, error } = usePost(urlLogin);
  const Navigate = useNavigate();
  const { setUser, setLogged } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario || !pass) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    const user1 = {
      usuario,
      pass,
    };

    httpConfigPost(user1, "POST");
  };

  useEffect(() => {
    if (dataPost && dataPost.message === "Success") {
      setUser(dataPost);
      setLogged(true);
      Navigate('/');
    }
  }, [dataPost, setUser, setLogged, Navigate]);

  useEffect(() => {
    if (error) {
      if (error === 'Erro: 404') {
        setErrorMessage('Usuário ou senha incorretos');
      }
    }
  }, [error])
return (
  <>
    {loading ? (<>
      <Flex textAlign={'center'} justifyContent={'center'} alignItems={'center'} pt={"20%"}>
        <ProgressCircle.Root value={null} size="xl">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
      </Flex>
    </>) : (<>
      {errorMessage ? (<Text background={'red'} textAlign={'center'} position={'sticky'}>{errorMessage}</Text>) : (null)}
      <Box w={'500px'} mx={'auto'} mt={'50px'}>
        <Heading size={'3xl'} textAlign={'center'}>Faça login e registre suas tarefas agora mesmo!</Heading>
        <form onSubmit={handleSubmit}>
          <Flex w={'100%'} direction={'column'} mt={'50px'}>
            <LoginInput labelInput={"Usuário:"} value={usuario} onChange={setUsuario} />
            <LoginInput labelInput={"Senha:"} value={pass} type={'password'} onChange={setPass} />
            <Flex w={'100%'} justify={'flex-end'}>
              <Button pl={'7px'} background={'gray'} mr={'5px'} mt={'.5em'} w={'90px'} onClick={() => Navigate('/Cadastro')} >Cadastrar</Button>
              <Input type="submit" pl={'7px'} background={'lightgreen'} mt={'.5em'} value={'Login'} w={'50px'} />
            </Flex>
          </Flex>
        </form>
      </Box >
    </>)}
  </>
);
};

export default Login;