import React from 'react'
import { Field } from "../components/ui/field.jsx";
import { Input } from '@chakra-ui/react';

const LoginInput = ({labelInput, value, onChange, type}) => {
    return (
        <>
            <Field label={labelInput}>
                <Input 
                    type={type}
                    value={value}
                    onChange={(e) => {onChange(e.target.value) }}
                />
            </Field>
        </>
    )
}

export default LoginInput
