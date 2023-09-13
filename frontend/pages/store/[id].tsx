import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Player } from 'video-react';
import { Avatar, Button, Group, Loader, Text, createStyles } from '@mantine/core';
import Head from 'next/head';

import Layout from '@/components/layout';
import authContext from '@/context/authContext';
import { API_URL } from '@/config/api';
import AppButton from '@/components/ui/button';
import VidoeStarRating from '@/components/videos/videoStarRating';
import moment from 'moment';
import PurchaseVideo from '@/components/videos/purchaseVideo';
import Review from '@/components/review';

const useStyles = createStyles((theme) => ({
    videoDetail: { display: 'flex' }
}));

const ProductDetailPage: React.FC<any> = props => {
    const authCtx = useContext(authContext);
    const router = useRouter()
    const { data, error } = useQuery(['store', router.query.id], async () => {
        const response = await fetch(`${API_URL}/store/${router.query.id}`, {
            headers: {
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        const data = await response.json();
        return data;
    });
    const { classes } = useStyles();
    const queryClient = useQueryClient();

    let content = <Loader />;
    if (error) content = <div>Error loading data</div>;
    else if (data) {
        content = (
            <>
                <Head>
                    <title>{data.productName}</title>
                </Head>
                <div style={{ marginTop: 10 }}></div>
                <img src={`${API_URL}/${data.thumbnail}`} width={200} />
                <h1>{data.productName}</h1>
                <div className={classes.videoDetail}>
                    <Group mr='md'>
                        <Avatar src='/images/profile-picture.png' radius="xl" />
                        <div style={{ flex: 1 }}>
                            <Link href={`/profile/${data.user.id}`}>
                                <Text size="sm" weight={500}>
                                    {data.user.username}
                                </Text>
                            </Link>
                            <Text color="dimmed" size="xs">
                                {data.user.followersCount} followers
                            </Text>
                        </div>
                    </Group>
                    {data.user.id === authCtx.authData.profile.id ? (
                        <Link href={`/videos/${data.id}/edit`}>
                            <AppButton>Edit video</AppButton>
                        </Link>
                    ) : (
                        <>
                            {data.user.following ? (
                                <Button
                                    variant='outline'
                                    color='red'
                                    onClick={async () => {
                                        await fetch(`${API_URL}/user/${data.user.id}/unfollow`, {
                                            method: 'POST',
                                            headers: {
                                                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
                                            }
                                        });
                                        queryClient.invalidateQueries({ queryKey: ['profile'] });
                                        queryClient.invalidateQueries({ queryKey: ['video', router.query.id] });
                                    }}
                                >
                                    Unfollow
                                </Button>
                            ) : (
                                <AppButton onClick={async () => {
                                    await fetch(`${API_URL}/user/${data.user.id}/follow`, {
                                        method: 'POST',
                                        headers: {
                                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
                                        }
                                    });
                                    queryClient.invalidateQueries({ queryKey: ['profile'] });
                                    queryClient.invalidateQueries({ queryKey: ['video', router.query.id] });
                                }}>
                                    Follow
                                </AppButton>
                            )}
                        </>
                    )}
                    <div style={{ flex: 1 }}></div>
                    <VidoeStarRating rating={`${data.review.avgRating}`} />
                </div>
                <h1>{data.productName}</h1>
                <Review payload={`${router.query.id}`} />
            </>
        )
    }


    return (
        <Layout activeNavigation='store'>
            {content}
        </Layout>
    );
}

export default ProductDetailPage;