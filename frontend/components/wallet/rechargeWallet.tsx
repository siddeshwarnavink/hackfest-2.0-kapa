import React, { useContext } from 'react';
import { TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import authContext from '@/context/authContext';
import { API_URL } from '@/config/api';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

import AppButton from '../ui/button';
import RechargePaymentSummary from './rechargePaymentSummary';

interface RechargeWalletProps {
    onClose: () => void;
};

const RechargeWallet: React.FC<RechargeWalletProps> = ({ onClose }) => {
    const authCtx = useContext(authContext);
    const queryClient = useQueryClient();

    async function onSubmit({ amount }) {
        // // Check if user's browser has MetaMask or any other Ethereum wallet installed
        // if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
        //     const provider = new ethers.BrowserProvider(window.ethereum);
        //     const signer = await provider.getSigner();

        //     const tx = await signer.sendTransaction({
        //         to: authCtx.authData.profile.ethereumAddress,
        //         value: ethers.parseEther(`${parseFloat(amount) * 0.000006124}`)
        //     });

        //     console.log(`Transaction hash: ${tx.hash}`);
        //     await tx.wait();

        //     console.log('Transaction is mined!');
        // } else {
        //     console.error('Please install MetaMask or another Ethereum wallet.');
        // }
        const response = await fetch(`${API_URL}/points/recharge`, {
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

    return (
        <form onSubmit={formik.handleSubmit}>
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
            {formik.values.amount.trim() !== '' && isNumberString(formik.values.amount) ?
                <RechargePaymentSummary amount={parseFloat(formik.values.amount)} />
                : null}

            <AppButton type='submit'>Pay</AppButton>
        </form>
    );
}

export default RechargeWallet;