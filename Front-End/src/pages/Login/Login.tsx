import { useState, FormEvent, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import { UserContext } from "../../context/NotificationContext";

const Login = () => {
  const urlLogin = "https://api-todo-ckia.onrender.com/user/login";
  const navigate = useNavigate();
  const { data: dataPost, httpConfig: postUser, loading, error } = useFetch<Iresponse>(urlLogin);
  const { setTitle, setDescription, setType } = useContext(UserContext);

  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario || !pass) {
      setTitle("Campos obrigatórios");
      setDescription("Por favor, preencha todos os campos.");
      setType("warning");
      return;
    }

    const userPayload = { usuario, pass };
    postUser("POST", userPayload);
  };

  useEffect(() => {
    if (dataPost) {
      insertToken('token', dataPost.toString());
      navigate('/');
    }
  }, [dataPost]);

  useEffect(() => {
    if (error) {
      setTitle("Erro no login");
      setDescription(error);
      setType('error');
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
        <VStack as="form" onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>

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
        </VStack>
      </Container>
    </Flex>
  );
};

export default Login;