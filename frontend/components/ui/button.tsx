import React from 'react';
import { Button, ButtonProps } from '@mantine/core';


const AppButton: React.FC<ButtonProps|any> = props => {
    return (
        <Button
            {...props}
            style={{
                background: props.disabled ? 'linear-gradient(180deg, #777, #efefef)' : 'linear-gradient(180deg, #2A5CC0, #09E6FF)',
                color: 'black',
                cursor: props.disabled ? 'not-allowed' : 'pointer',
                border: 'none',
                fontWeight: 'bold'
            }}
        >
            {props.children}
        </Button>
    );
}

AppButton.defaultProps = {
    disabled: false
};

export default AppButton;
