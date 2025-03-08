import React, { useState, useEffect, ReactElement, FormEvent } from 'react';
import { Box, Button, Heading, Text, Flex, ProgressCircle } from '@chakra-ui/react';
import usePost from '../../hooks/usePost';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../../components/LoginInput/LoginInput'

const Cadastro = () => {
    const url = 'https://api-todo-ckia.onrender.com/user/register'
    const Navigate = useNavigate();
    const [pass, setPass] = useState('');
    const [usuario, setUsuario] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { httpConfigPost, error, dataPost, loading } = usePost(url);

    const createUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!usuario || !pass || !confirmPass) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        };

        if (pass !== confirmPass) {
            setErrorMessage("As Senhas precisam ser iguais.");
            return;
        };

        if (pass.length < 6) {
            setErrorMessage("A senha precisa 6 caracteres, no mínimo");
            return;
        };

        const user = {
            usuario,
            pass,
        };

        httpConfigPost(user, "POST");
    };

    useEffect(() => {
        if (error) {
            console.log(error)
            console.log(error)
            alert("Usuário Inválido ou em uso")
            setUsuario('');
        }
    }, [error])

    useEffect(() => {
        if (dataPost) {
            setErrorMessage("Usuário criado Faça login para continuar")
            Navigate('/');
        }
    })

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
                <Heading size={'3xl'} textAlign={'Center'} mt={'1em'}>
                    Criar Conta
                </Heading>
                <Box p={'1em'} w={'500px'} m={'auto'} mt={'1em'}>
                    <form onSubmit={createUser}>
                        <LoginInput labelInput={"Cadastro:"} type='text' value={usuario} onChange={setUsuario} />
                        <LoginInput labelInput={"Senha:"} value={pass} type={'password'} onChange={setPass} />
                        <LoginInput labelInput={"confirme a senha:"} type={'password'} value={confirmPass} onChange={setConfirmPass} />
                        <Button type='submit' mt={'1em'}>
                            Criar Conta
                        </Button>
                        <Button mt={'1em'} ml={'.3em'} variant={'outline'} onClick={() => Navigate('/Login')}>
                            Fazer Login
                        </Button>
                    </form>
                </Box>
            </>)}
        </>
    )
}

export default Cadastro
