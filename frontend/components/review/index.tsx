import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Loader, Rating, Textarea, Text, SimpleGrid, Grid } from '@mantine/core';
import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
import * as yup from 'yup';

import authContext from '@/context/authContext';
import { API_URL } from '@/config/api';
import AppButton from '../ui/button';
import ReviewCard from './reviewCard';

interface ReviewProps {
    payload: string;
};

const Review: React.FC<ReviewProps> = ({ payload }) => {
    const authCtx = useContext(authContext);
    const { data, error } = useQuery(['review', payload], async () => {
        const response = await fetch(`${API_URL}/review/${payload}`, {
            headers: {
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        const data = await response.json();
        return data;
    });
    const queryClient = useQueryClient();

    let content = <Loader />;
    if (error) content = <div>Error in loading review</div>;
    else if (data) {
        const validationSchema = yup.object().shape({
            message: yup.string().required('Message is required'),
            rating: yup.number().min(1, 'Rating should be between 1 and 3').max(3, 'Rating should be between 1 and 3').required('Rating is required'),
        });


        const validateFormikValues = async (values: { message: string; rating: number; }) => {
            let errors: FormikErrors<typeof values> = {};
            try {
                await validationSchema.validate(values, { abortEarly: false });
            } catch (err) {
                err.inner.forEach((error: any) => {
                    errors[error.path] = error.message;
                });
            }
            return errors;
        };

        content = (
            <>
                {!data.userReview ? (
                    <Formik
                        initialValues={{ message: '', rating: 0 }}
                        validate={validateFormikValues}
                        onSubmit={async (values, { setSubmitting }) => {
                            await fetch(`${API_URL}/review/${payload}`, {
                                method: 'POST',
                                body: JSON.stringify(values),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + authCtx.authData.token
                                }
                            });
                            setSubmitting(false);
                            queryClient.invalidateQueries({ queryKey: ['review', payload] });
                        }}
                    >
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form>
                                <h3>Post your review</h3>
                                <div>
                                    <Field as={Textarea} name="message" placeholder='What do you think?' />
                                    <ErrorMessage name="message" component={Text} color='red' />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', margin: '12px 0' }}>
                                    <div style={{ marginRight: '12px' }}>
                                        <ErrorMessage name="rating" component={Text} color='red' />
                                    </div>
                                    <div style={{ marginRight: '12px' }}>
                                        <Rating
                                            value={values.rating}
                                            onChange={(value) => setFieldValue('rating', value)}
                                            count={3}
                                        />
                                    </div>
                                    <div>
                                        <AppButton type="submit" disabled={isSubmitting}>
                                            Submit
                                        </AppButton>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <>
                        <h3>My review</h3>
                        <ReviewCard
                            key={data.userReview.id}
                            author={data.userReview.author}
                            message={data.userReview.message}
                            rating={data.userReview.rating}
                            userAuthor
                        />
                    </>
                )}
                <h3>Other reviews</h3>
                {data.reviews.length > 0 ? data.reviews.map(review => {
                    return (
                        <ReviewCard
                            key={review.id}
                            author={review.author}
                            message={review.message}
                            rating={review.rating}
                        />
                    )
                }) : <p>No reviews</p>}
            </>
        )
    }

    return content;
}

export default Review;