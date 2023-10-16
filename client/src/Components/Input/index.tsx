import React from 'react';
import { Input } from '@chakra-ui/react'

interface Props {
    onChange?: (event: any)=> void,
    value: string | number,
    placeholder: string,
    style?: object
    // any props that come into the component
}

export default function C_Input({onChange, value, placeholder, style}: Props){

    return(
        <>
            <Input variant="filled" placeholder={placeholder} onChange={onChange} value={value} style={style}/>
        </>
    )
}