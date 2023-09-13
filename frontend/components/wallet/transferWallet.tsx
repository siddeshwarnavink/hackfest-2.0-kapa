import React, { useContext } from 'react';
import { Alert, TextInput, Text } from '@mantine/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import authContext from '@/context/authContext';
import { API_URL } from '@/config/api';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconAt, IconCheck, IconExclamationMark } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import AppButton from '../ui/button';
import RechargePaymentSummary from './rechargePaymentSummary';

interface TransferWalletProps {
    onClose: () => void;
    amount?: number;
    to?: string;
    payload?: string;
    transferType?: 'transfer' | 'video' | 'product';
};

const TransferWallet: React.FC<TransferWalletProps> = ({ onClose, to, amount, transferType, payload }) => {
    const authCtx = useContext(authContext);
    const queryClient = useQueryClient();
    const profileData = queryClient.getQueryData<{ profile: { points: number } }>(['profile']);

    async function onSubmit({ amount, to }) {
        const response = await fetch(`${API_URL}/points/transfer`, {
            method: 'POST',
            body: JSON.stringify({
                amount,
                to,
                payload: payload ? payload : null,
                transferType
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        const data = await response.json();
        if (response.ok) {
            notifications.show({
                title: 'Success',
                message: data.message,
                icon: <IconCheck />,
                color: 'green'
            });
            if(transferType === 'video') {
                queryClient.invalidateQueries({ queryKey: ['video', payload] });
            }
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            onClose();
        } else {
            notifications.show({
                title: 'Error',
                message: data.message,
                icon: <IconExclamationMark />,
                color: 'red'
            });
        }


    };

    const initialValues = {
        to: to ? to : '',
        amount: amount ? `${amount}` : '2'
    };

    const validationSchema = yup.object().shape({
        to: yup.string().required('Sender email required'),
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
                <Alert icon={<IconAlertCircle size='1rem' />} color='red'>
                    <Text>
                        You don't have enough points
                    </Text>
                </Alert>
            ) : null
            }

            <TextInput
                required
                disabled={to ? true : false}
                label='Send to'
                placeholder='sid@test.com'
                mb='md'
                name='to'
                icon={<IconAt size={18} />}
                value={formik.values.to}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.to && Boolean(formik.errors.to) ? `${formik.touched.to && formik.errors.to}` : null}
            />

            <TextInput
                required
                disabled={amount ? true : false}
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

            <AppButton disabled={isInvlid || formik.touched.amount && Boolean(formik.errors.amount) ? true : false} type='submit'>Transfer</AppButton>
        </form >
    );
}

TransferWallet.defaultProps = {
    transferType: 'transfer'
};

export default TransferWallet;