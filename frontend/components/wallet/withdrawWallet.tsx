import React, { useContext } from 'react';
import { Alert, TextInput, Text } from '@mantine/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import authContext from '@/context/authContext';
import { API_URL } from '@/config/api';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import AppButton from '../ui/button';
import RechargePaymentSummary from './rechargePaymentSummary';

interface WithdrawWalletProps {
    onClose: () => void;
};

const WithdrawWallet: React.FC<WithdrawWalletProps> = ({ onClose }) => {
    const authCtx = useContext(authContext);
    const queryClient = useQueryClient();
    const profileData = queryClient.getQueryData<{ profile: { points: number } }>(['profile']);

    async function onSubmit({ amount }) {
        const response = await fetch(`${API_URL}/points/withdraw`, {
            method: 'POST',
            body: JSON.stringify({
                amount
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        if (response.ok) {
            const data = await response.json();
            notifications.show({
                title: 'Success',
                message: data.message,
                icon: <IconCheck />,
                color: 'green'
            });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            onClose();
        }


    };

    const initialValues = {
        amount: '2'
    };

    const validationSchema = yup.object().shape({
        amount: yup.number().required('Price is required').min(1, 'Price should be alteast 1')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    function isNumberString(str) {
        return isFinite(parseFloat(str)) && parseFloat(str).toString() === str;
    }

    const isInvlid = profileData && profileData.profile.points < parseFloat(`${formik.values.amount}`);

    return (
        <form onSubmit={formik.handleSubmit}>
            {isInvlid ? (
                <Alert icon={<IconAlertCircle size="1rem" />} color='red'>
                    <Text>
                        You don't have enough points
                    </Text>
                </Alert>
            ) : null
            }
            <TextInput
                required
                label='Amount'
                mb='md'
                name='amount'
                icon={<img src='/images/Coin.svg' width={18} />}
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount) ? `${formik.touched.amount && formik.errors.amount}` : null}
            />
            {
                !isInvlid && (formik.values.amount.trim() !== '' && isNumberString(formik.values.amount)) ?
                    <RechargePaymentSummary amount={parseFloat(formik.values.amount)} />
                    : null
            }

            <AppButton disabled={isInvlid || formik.touched.amount && Boolean(formik.errors.amount) ? true : false} type='submit'>Withdraw</AppButton>
        </form >
    );
}

export default WithdrawWallet;