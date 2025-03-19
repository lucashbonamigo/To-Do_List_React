import { Flex, Input } from '@chakra-ui/react';
import { propFunc } from './Interfaces';

const LoginInput = ({labelInput, value, onChange, type}: propFunc) => {
    return (
        <>
            <Flex direction={'column'} mt={'20px'} w={'100%'}>
                <sup>{labelInput}</sup>
                <Input 
                    mt={'4px'}
                    type={type}
                    value={value}
                    onChange={(e) => {onChange(e.target.value) }}
                    border={'1px solid white'}
                    px={'5px'}
                />
            </Flex>
        </>
    )
}

export default LoginInput
