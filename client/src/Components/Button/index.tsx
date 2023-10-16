import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'

interface Props {
    onClick?: (event: any)=> void
    // any props that come into the component
}

export default function C_Button({onClick}: Props){

    return(
        <>
            <Button colorScheme='blue' onClick={onClick}>Button</Button>
        </>
    )
}