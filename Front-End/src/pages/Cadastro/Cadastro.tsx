import { useState, useEffect, FormEvent, useContext } from 'react';
import { Button, Container, Flex, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../../components/LoginInput/LoginInput'
import useFetch from '../../hooks/useFetch';
import { UserContext } from '../../context/NotificationContext';

const Cadastro = () => {
    const url = 'https://api-todo-ckia.onrender.com/user/register'
    const Navigate = useNavigate();
    const [pass, setPass] = useState('');
    const [usuario, setUsuario] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const { httpConfig, error, data, loading } = useFetch(url);
    const { setTitle, setDescription, setType } = useContext(UserContext);

    const createUser = (e: FormEvent<HTMLDivElement>) => {

        e.preventDefault();
        if (!usuario || !pass || !confirmPass) {
            setTitle("Campos obrigatórios");
            setDescription("Por favor, preencha todos os campos.");
            setType("warning")
            setPass('');
            setConfirmPass('');
            return
        }

        if (pass.length < 6) {
            setTitle("Senha inválida");
            setDescription("A senha precisa ter no mínimo 6 caracteres");
            setType("warning")
            setPass('');
            return;
        }

        if (pass !== confirmPass) {
            setTitle("Senha inválida");
            setDescription("As senhas precisam ser iguais");
            setType("warning");
            setPass('');
            setConfirmPass('');
            return;
        };

        const user = {
            usuario,
            pass,
        };
        httpConfig("POST", user);
    };

    useEffect(() => {
        if (error) {
            setTitle("Usuário Inválido ou em uso");
            setDescription("Usuário Inválido ou em uso");
            setType("error")
            setPass('');
            setConfirmPass('')
            return
        }
    }, [error])

    useEffect(() => {
        if (data) {
            setTitle("Sucesso");
            setDescription("Usuário criado Faça login para continuar");
            setType("success");
            Navigate('/');
        }
    })

    return (
        <>
            <Flex
                minH="100vh"
                align="center"
                justify="center"
                bg="#1F2630"
            >
                <Container maxW="md" color={"#B5BDC8"} p={8} bg="#343E48" borderRadius="lg" boxShadow="lg">
                    <Heading size={'3xl'} textAlign={'Center'} mt={'1em'}>
                        Criar Conta
                    </Heading>
                    <VStack as='form' onSubmit={(e: FormEvent<HTMLDivElement>) => { createUser(e) }}>
                        <LoginInput
                            labelInput={"Cadastro:"}
                            type='text'
                            width={'80%'}
                            value={usuario}
                            onChange={setUsuario}
                        />
                        <LoginInput
                            labelInput={"Senha:"}
                            value={pass}
                            width={'80%'}
                            type={'password'}
                            onChange={setPass}
                        />
                        <LoginInput
                            labelInput={"confirme a senha:"}
                            width={'80%'}
                            type={'password'}
                            value={confirmPass}
                            onChange={setConfirmPass}
                        />
                        <Flex
                            justify={'space-between'}
                            mt={'1em'}
                            w={'100%'}
                        >
                            <Button
                                mr={'.3em'}
                                variant={'outline'}
                                onClick={() => Navigate('/Login')}
                            >
                                Fazer Login
                            </Button>
                            <Button
                                type='submit'
                                loading={loading}
                            >
                                Criar Conta
                            </Button>
                        </Flex>
                    </VStack>
                </Container>
            </Flex>
        </>
    )
}

export default Cadastro
