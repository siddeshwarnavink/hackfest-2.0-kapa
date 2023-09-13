import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
} from '@mantine/core';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

import AppButton from '@/components/ui/button';
import { API_URL } from '@/config/api';

const AuthPage: React.FC<any> = () => {
    const [isLogin, setLogin] = useState<boolean>(true);

    async function onLoginHandler(values, { setSubmitting }) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        localStorage.setItem('auth', JSON.stringify(data));
        window.location.replace('/');
        setSubmitting(false);
    }
    async function onCreateAccountHandler(values, { setSubmitting }) {
        const response = await fetch(`${API_URL}/auth/createAccount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });
        await response.json();
        notifications.show({
            title: 'Account created',
            message: 'You can login into your new account.',
            icon: <IconCheck />,
            color: 'green'
        });
        setLogin(true);
        setSubmitting(false);
    }

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });
    const createAccountSchema = Yup.object().shape({
        username: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    let authForm = (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={onLoginHandler}
        >
            <Form>
                <Field name='email'>
                    {({ field, meta }) => (
                        <TextInput
                            {...field}
                            label='Email'
                            placeholder='sid@test.com'
                            error={meta.touched && meta.error ? meta.error : null}
                        />
                    )}
                </Field>

                <Field name='password'>
                    {({ field, meta }) => (
                        <PasswordInput
                            {...field}
                            label='Password'
                            placeholder='************'
                            mt='md'
                            error={meta.touched && meta.error ? meta.error : null}
                        />
                    )}
                </Field>
                <Group position='apart' mt='lg'>
                    <Checkbox checked label='Remember me' sx={{ lineHeight: 1 }} />
                    <Anchor<'a'>
                        onClick={(event) => event.preventDefault()}
                        href='#'
                        size='sm'
                    >
                        Forgot password?
                    </Anchor>
                </Group>
                <AppButton fullWidth mt='xl' type='submit'>
                    Sign in
                </AppButton>
            </Form>
        </Formik>
    );
    if (!isLogin) {
        authForm = (
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validationSchema={createAccountSchema}
                onSubmit={onCreateAccountHandler}
            >
                <Form>
                    <Field name='username'>
                        {({ field, meta }) => (
                            <TextInput
                                {...field}
                                label='Username'
                                placeholder='Sid'
                                error={meta.touched && meta.error ? meta.error : null}
                            />
                        )}
                    </Field>
                    <Field name='email'>
                        {({ field, meta }) => (
                            <TextInput
                                {...field}
                                label='Email'
                                mt='md'
                                placeholder='sid@test.com'
                                error={meta.touched && meta.error ? meta.error : null}
                            />
                        )}
                    </Field>
                    <Field name='password'>
                        {({ field, meta }) => (
                            <PasswordInput
                                {...field}
                                label='Password'
                                placeholder='************'
                                mt='md'
                                error={meta.touched && meta.error ? meta.error : null}
                            />
                        )}
                    </Field>
                    <AppButton fullWidth mt='xl' type='submit'>
                        Create
                    </AppButton>
                </Form>
            </Formik>
        );
    }

    return (
        <>
            <Head>
                <title>{isLogin ? 'Login' : 'Create account'} - Kapa</title>
            </Head>
            <Container size={420} my={40}>
                <Title
                    align='center'
                    sx={() => ({
                        fontWeight: 900,
                    })}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                        <img style={{ display: 'block', width: 50 }} src='/images/Kapa-logo-big.png' alt='Kapa' />
                    </div>
                    {isLogin ? 'Welcome back!' : 'Welcome!'}
                </Title>
                <Text color='dimmed' size='sm' align='center' mt={5}>
                    {isLogin ? 'Do not have an account yet?' : 'Already have an account?'}{' '}
                    <Anchor<'a'>
                        href='#'
                        size='sm'
                        onClick={() => setLogin(currentLogin => !currentLogin)}
                    >
                        {isLogin ? 'Create account' : 'Login'}
                    </Anchor>
                </Text>
                <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
                    {authForm}
                </Paper>
            </Container>
        </>
    );
};

export default AuthPage;