import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePost from "../../hooks/usePost";
import { Input, Flex, Heading, Button, Text, ProgressCircle } from "@chakra-ui/react";
import LoginInput from '../../components/LoginInput/LoginInput'
import { changeLocalStorage, insertUserId } from "../../services/storage/localstorage";
import { Iresponse } from "../../Interfaces/Interfaces";

const Login = () => {
  const urlLogin = "https://api-todo-ckia.onrender.com/user/login";
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const { dataPost, httpConfigPost, loading, errorPost } = usePost<Iresponse>(urlLogin);
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
    httpConfigPost(user1, "POST");
  };

  useEffect(() => {
    if (dataPost) {
      changeLocalStorage('Valid', true);
      insertUserId('id', dataPost.id.toString());
      window.location.href = '/';
    }
  }, [dataPost, navigate]);

  useEffect(() => {
    if (errorPost) {
      if (errorPost === 'Erro: 404') {
        setErrorMessage('Usuário ou senha incorretos');
      }
    }
  }, [errorPost])

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
            <Flex direction={'column'} mt={'50px'} w={'100%'} maxWidth={'400px'} mx={'auto'}>
              <LoginInput labelInput={"Usuário:"} value={usuario} type={'text'} onChange={setUsuario} />
              <LoginInput labelInput={"Senha:"} value={pass} type={'password'} onChange={setPass} />
              <Flex w={'100%'} justify={'flex-end'}>
                <Button pl={'7px'} background={'gray'} mr={'5px'} mt={'.5em'} w={'90px'} onClick={() => navigate('/Cadastro')} >Cadastrar</Button>
                <Input type="submit" pl={'7px'} background={'lightgreen'} mt={'.5em'} value={'Login'} w={'50px'} />
              </Flex>
            </Flex>
          </form>
        </Flex >
      </>)}
    </>
  );
};

export default Login;