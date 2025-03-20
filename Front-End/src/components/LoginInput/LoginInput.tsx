import { Flex, Input } from '@chakra-ui/react';
import { propFunc } from './Interfaces';

const LoginInput = ({labelInput, value, onChange, type, width}: propFunc) => {
    return (
        <>
            <Flex direction={'column'} w={width} mt={'20px'}>
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
