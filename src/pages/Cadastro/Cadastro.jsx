import React, { useState } from 'react';
import { Box, Input, Button, Heading, Center } from '@chakra-ui/react';
import { Field } from "../../components/ui/field.jsx";
import useFetch from '../../Functions/useFetch';

const Cadastro = () => {
    const url = 'http://localhost:5000/CreateUser'
    const [pass, setPass] = useState('')
    const [usuario, setUsuario] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const { data, httpConfig } = useFetch(url)

    const createUser = (e) => {
        e.preventDefault();
        if (!usuario || !pass) {
            alert("Por favor, preencha todos os campos.");
            return;
        };

        if (!pass || !confirmPass) {
            alert("Por favor, preencha todos os campos.");
            return;
        };
        const user = {
            usuario,
            pass,
        };
        httpConfig(user, "POST");
    };
    if (data) {
    }

    return (
        <>
            <Heading size={'3xl'} textAlign={'Center'} mt={'1em'}>Criar Conta</Heading>
            <Box border={'1px solid black'} p={'1em'} borderRadius={'2xl'} w={'90vw'} m={'auto'} mt={'1em'}>
                <form onSubmit={createUser}>
                    <Field label="Usuário:">
                        <Input type={"text"} value={usuario} onChange={(e) => { setUsuario(e.target.value) }} />
                    </Field>
                    <Field label="Senha:">
                        <Input type={"password"} value={pass} onChange={(e) => { setPass(e.target.value) }} />
                    </Field>
                    <Field label="Confirme a Senha:">
                        <Input type={"password"} value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value) }} />
                    </Field>
                    <Button type='submit' mt={'1em'}>Criar Conta</Button>
                    <Button mt={'1em'} ml={'.3em'} variant={'outline'}>Fazer Login</Button>
                </form>
            </Box>
        </>
    )
}

export default Cadastro
