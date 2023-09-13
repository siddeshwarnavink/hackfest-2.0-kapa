import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Container, FileInput, Input, Loader, TextInput, Textarea, rem } from '@mantine/core';
import Head from 'next/head';
import { useFormik } from 'formik';
import { IconCheck, IconUpload } from '@tabler/icons-react';
import { useRouter } from 'next/router'
import * as yup from 'yup';
import { notifications } from '@mantine/notifications';

import Layout from '@/components/layout';
import authContext from '@/context/authContext';
import { API_URL } from '@/config/api';
import AppButton from '@/components/ui/button';

interface EditVideoFormProps {
    id: string;
    title: string;
    description: string;
    cost: string;
};

const EditVideoForm: React.FC<EditVideoFormProps> = ({ id, title, description, cost }) => {
    const authCtx = useContext(authContext);
    const router = useRouter();
    const initialValues = {
        title,
        description,
        thumbnail: null,
        price: `${cost}`
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        description: yup.string().required('Description is required'),
        price: yup.number().required('Price is required').min(0, 'Price should be positive')
    });

    async function onSubmit(values) {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('thumbnail', values.thumbnail);
        formData.append('cost', values.price.toString());

        try {
            const response = await fetch(`${API_URL}/videos/${id}`, {
                method: 'PATCH',
                body: formData,
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authCtx.authData.token
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const data = await response.json();
                notifications.show({
                    title: 'Success',
                    message: data.message,
                    icon: <IconCheck />,
                    color: 'green'
                });
                router.push('/videos/' + id);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextInput
                name='title'
                label='Video title'
                required
                mb='md'
                placeholder='e.g My first video!'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title) ? `${formik.touched.title && formik.errors.title}` : null}
            />

            <Textarea
                label='Video description'
                required
                mb='md'
                name='description'
                placeholder='e.g Really cool video'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description) ? `${formik.touched.description && formik.errors.description}` : null}
            />
            <Input.Wrapper
                required
                label='Thumbnail'
                mb='md'
                error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail) ? `${formik.touched.thumbnail && formik.errors.thumbnail}` : null}
            >
                <FileInput
                    name='thumbnail'
                    placeholder='Thumbnail'
                    icon={<IconUpload size={rem(14)} />}
                    accept='image/png,image/jpeg'
                    onChange={(acceptedFile) => {
                        formik.setFieldValue('thumbnail', acceptedFile);
                    }}
                    onBlur={formik.handleBlur}
                />
            </Input.Wrapper>
            <TextInput
                required
                label='Price'
                mb='md'
                name='price'
                icon={<img src='/images/Coin.svg' width={18} />}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price) ? `${formik.touched.price && formik.errors.price}` : null}
            />
            <AppButton type='submit'>Save</AppButton>{' '}
            <Button type='button' variant="subtle" color="red">Delete</Button>
        </form>
    );
}

const EidtVideoDetailPage: React.FC<any> = props => {
    const authCtx = useContext(authContext);
    const router = useRouter()
    const { data, error } = useQuery(['video', router.query.id], async () => {
        const response = await fetch(`${API_URL}/videos/${router.query.id}`, {
            headers: {
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        const data = await response.json();
        return data;
    });

    let content = <Loader />;
    if (error) content = <div>Error loading data</div>;
    else if (data) {
        content = (
            <>
                <Head>
                    <title>Edit video - {data.title}</title>
                </Head>
                <h1>Edit video</h1>
                <EditVideoForm {...data} />
            </>
        )
    }


    return (
        <Layout activeNavigation=''>
            <Container>
                {content}
            </Container>
        </Layout>
    );
}


export default EidtVideoDetailPage;