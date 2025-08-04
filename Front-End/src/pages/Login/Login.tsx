import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Input, Flex, Heading, Button, Text, ProgressCircle } from "@chakra-ui/react";
import LoginInput from '../../components/LoginInput/LoginInput'
import { insertToken } from "../../services/storage/localstorage";
import { Iresponse } from "../../Interfaces/Interfaces";
import useFetch from "../../hooks/useFetch";

const Login = () => {
  const urlLogin = "https://api-todo-ckia.onrender.com/user/login";
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const { data: dataPost, httpConfig: postUser, loading, error } = useFetch<Iresponse>(urlLogin);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario || !pass) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    const user1 = {
      usuario,
      pass,
    };
    postUser("POST", user1);
  };

  useEffect(() => {
    if (dataPost) {
      insertToken('token', dataPost.toString());
      window.location.href = '/';
    }
  }, [dataPost, navigate]);

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
        <Flex direction={"column"} mt={'50px'}>
          <Heading size={'3xl'} textAlign={'center'}>Faça login e registre suas tarefas agora mesmo!</Heading>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Flex direction={'column'} mt={'50px'} maxWidth={'400px'} marginX={{base: "20px", sm: "auto"}}>
              <LoginInput labelInput={"Usuário:"} value={usuario} type={'text'} onChange={setUsuario} />
              <LoginInput labelInput={"Senha:"} value={pass} type={'password'} onChange={setPass} />
              <Flex w={'100%'} pl={'7px'}justify={'flex-end'} mt={'.5em'}>
                <Button  background={'gray'} mr={'5px'} onClick={() => navigate('/Cadastro')}>Cadastrar</Button>
                <Input type="submit" pl={'7px'} color={'white'} background={'green'} value={'Login'} w={'50px'}/>
              </Flex>
            </Flex>
          </form>
        </Flex >
      </>)}
    </>
  );
};

export default Login;