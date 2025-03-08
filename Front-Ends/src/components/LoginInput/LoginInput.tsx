import { Flex, Input } from '@chakra-ui/react';
import { propFunc } from './Interfaces';

const LoginInput = ({labelInput, value, onChange, type}: propFunc) => {
    return (
        <>
            <Flex direction={'column'} mt={'20px'}>
                <sup>{labelInput}</sup>
                <Input 
                    mt={'4px'}
                    type={type}
                    value={value}
                    onChange={(e) => {onChange(e.target.value) }}
                />
            </Flex>
        </>
    )
}

export default LoginInput
