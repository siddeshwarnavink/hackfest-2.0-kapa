import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Player } from 'video-react';
import { Avatar, Button, Container, Group, Loader, Text, createStyles } from '@mantine/core';
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
    videoDetail: {
        display: 'flex'
    }
}));

const VideoDetailPage: React.FC<any> = props => {
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
    const { classes } = useStyles();
    const queryClient = useQueryClient();

    let content = <Loader />;
    if (error) content = <div>Error loading data</div>;
    else if (data) {
        content = (
            <Container>
                <Head>
                    <title>{data.title}</title>
                </Head>
                <div style={{ marginTop: 10 }}></div>
                {data.video ? (
                    <Player
                        playsInline
                        poster={`${API_URL}/${data.thumbnail}`}
                        src={`${API_URL}/${data.video}`}
                        autoPlay
                    />
                ) : (
                    <PurchaseVideo
                        thumbnail={data.thumbnail}
                        points={data.cost}
                        user={data.user}
                        videoId={data.id}
                    />
                )}
                <h1>{data.title}</h1>
                <div className={classes.videoDetail}>
                    <Group mr='md'>
                        <Avatar src='/images/profile-picture.png' radius='xl' />
                        <div style={{ flex: 1 }}>
                            <Link href={`/profile/${data.user.id}`}>
                                <Text size='sm' weight={500}>
                                    {data.user.username}
                                </Text>
                            </Link>
                            <Text color='dimmed' size='xs'>
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
                                }}>Follow</AppButton>
                            )}
                        </>
                    )}
                    <div style={{ flex: 1 }}></div>
                    <VidoeStarRating rating={`${data.review.avgRating}`} />
                </div>
                <div style={{ marginTop: 16 }}>
                    <Text c='dimmed'>{moment(data.createdAt).format('MMM Do YY')}</Text>
                    <Text>{data.description}</Text>
                </div>
                <Review payload={data.id} />
            </Container>
        )
    }


    return (
        <Layout activeNavigation=''>
            {content}
        </Layout>
    );
}

export default VideoDetailPage;