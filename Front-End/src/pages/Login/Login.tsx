import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../../components/ui/toaster";
import {
  Flex,
  Heading,
  Button,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/react";
import LoginInput from '../../components/LoginInput/LoginInput';
import { insertToken } from "../../services/storage/localstorage";
import { Iresponse } from "../../Interfaces/Interfaces";
import useFetch from "../../hooks/useFetch";

const Login = () => {
  const urlLogin = "https://api-todo-ckia.onrender.com/user/login";
  const navigate = useNavigate();
  const { data: dataPost, httpConfig: postUser, loading, error } = useFetch<Iresponse>(urlLogin);

  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario || !pass) {
      toaster.create({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    const userPayload = { usuario, pass };
    await postUser("POST", userPayload);
  };

  useEffect(() => {
    if (dataPost) {
      insertToken('token', dataPost.toString());
      
      
      navigate('/');
    }
  }, [dataPost]);

  useEffect(() => {
    if (error) {
      const message = error === 'Erro: 404' ? 'Usuário ou senha incorretos' : 'Erro ao conectar';
      toaster.create({
        title: "Erro no login",
        description: message,
        type: "error",
        duration: 4000,
      });
    }
  }, [error]);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="#1F2630"
    >
      <Container 
        maxW="md" 
        color={"#B5BDC8"} 
        p={8} bg="#343E48" 
        borderRadius="lg" 
        boxShadow="lg"
      >
        <VStack as="form" onSubmit={(e: FormEvent<HTMLDivElement>) => handleSubmit(e)}>

          <Heading size="3xl" textAlign="center" color="#B5BDC8">
            Faça seu Login
          </Heading>

          <VStack w="100%">
            <LoginInput
              labelInput="Usuário:"
              value={usuario}
              type="text"
              onChange={setUsuario}
              background-color={"#1F2630"}
            />
            <LoginInput
              labelInput="Senha:"
              value={pass}
              type="password"
              onChange={setPass}
              background-color={"#1F2630"}
            />
          </VStack>

          <HStack w="100%" justify="space-between" pt={4}>
            <Button
              variant="ghost"
              onClick={() => navigate('/Cadastro')}
            >
              Criar conta
            </Button>

            <Button
              type="submit"
              colorScheme="green"
              loading={loading}
              loadingText="Entrando"
              px={8}
            >
              Entrar
            </Button>
          </HStack>
          <Toaster />
        </VStack>
      </Container>
    </Flex>
  );
};

export default Login;