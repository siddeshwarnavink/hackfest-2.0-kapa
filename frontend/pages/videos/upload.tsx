import React, { useContext, useRef } from 'react';
import { createStyles, rem, Text, Group, Input, Textarea, FileInput, TextInput, Container } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useRouter } from 'next/router';
import { IconCloudUpload, IconX, IconDownload, IconUpload } from '@tabler/icons-react';
import { useFormik } from 'formik';
import { API_URL } from '@/config/api';
import * as yup from 'yup';

import Layout from '@/components/layout';
import authContext from '@/context/authContext';
import AppButton from '@/components/ui/button';


const useStyles = createStyles((theme) => ({
    uploadwrapper: {
        position: 'relative',
        marginBottom: rem(30),
    },

    dropzone: {
        borderWidth: rem(1),
        paddingBottom: rem(50),
    },
}));

const UploadPage: React.FC = () => {
    const authCtx = useContext(authContext);
    const { classes, theme } = useStyles();
    const openRef = useRef<() => void>(null);
    const router = useRouter();

    const initialValues = {
        title: '',
        description: '',
        video: null,
        thumbnail: null,
        price: '0'
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        description: yup.string().required('Description is required'),
        video: yup.mixed().required('Video is required'),
        thumbnail: yup.mixed().required('Thumbnail is required'),
        price: yup.number().required('Price is required').min(0, 'Price should be positive')
    });

    async function onSubmit(values) {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('video', values.video);
        formData.append('thumbnail', values.thumbnail);
        formData.append('cost', values.price.toString());

        try {
            const response = await fetch(`${API_URL}/videos`, {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authCtx.authData.token
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const responseData = await response.json();
                router.push(`/videos/${responseData.videoId}`);
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
        <Layout activeNavigation=''>
            <Container>
                <h2>Upload video</h2>
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

                    <Input.Wrapper label='Video' required mb='md'>
                        <div className={classes.uploadwrapper}>
                            <Dropzone
                                openRef={openRef}
                                onDrop={(acceptedFiles) => {
                                    formik.setFieldValue('video', acceptedFiles[0]);
                                }}
                                className={classes.dropzone}
                                radius='md'
                                accept={[MIME_TYPES.mp4]}
                                maxSize={30 * 1024 ** 2}
                            >
                                <div style={{ pointerEvents: 'none' }}>
                                    <Group position='center'>
                                        <Dropzone.Accept>
                                            <IconDownload
                                                size={rem(50)}
                                                color={theme.colors[theme.primaryColor][6]}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            <IconCloudUpload
                                                size={rem(50)}
                                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Idle>
                                    </Group>

                                    <Text ta='center' fw={700} fz='lg' mt='xl'>
                                        <Dropzone.Accept>Drop video here</Dropzone.Accept>
                                        <Dropzone.Reject>Video file less than 500mb</Dropzone.Reject>
                                        <Dropzone.Idle>Upload video</Dropzone.Idle>
                                    </Text>
                                    <Text ta='center' fz='sm' mt='xs' c='dimmed'>
                                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.mp4</i> files that
                                        are less than 500mb in size.
                                    </Text>
                                </div>
                            </Dropzone>
                        </div>
                    </Input.Wrapper>
                    <Input.Wrapper
                        required
                        label='Thumbnail'
                        mb='md'
                        error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail) ? `${formik.touched.thumbnail && formik.errors.thumbnail}` : null}
                    >
                        <FileInput
                            name='thumbnail'
                            placeholder='Thumbnail'
                            accept='image/png,image/jpeg'
                            icon={<IconUpload size={rem(14)} />}
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
                    <AppButton type='submit'>Post</AppButton>
                </form>
            </Container>
        </Layout>
    );

};

export default UploadPage;