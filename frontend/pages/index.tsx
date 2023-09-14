import React, { useContext } from 'react';
import { Box, Container, Grid, Loader, SimpleGrid, Skeleton, Stack, px, rem, useMantineTheme } from '@mantine/core';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';

import Layout from '@/components/layout';
import VidoeCard from '@/components/videos/videoCard';
import { API_URL } from '@/config/api';
import authContext from '@/context/authContext';
import LocalTalks from '@/components/home/localTalks';
import HomeNav from '@/components/home/homeNav';
import HomePrice from '@/components/home/homePrice';
import MockLoading from '@/components/ui/mockLoading';
import communityContext from '@/context/community';
import { t } from 'i18next';

const Homepage: React.FC<{}> = () => {
    const authCtx = useContext(authContext);
    const communityCtx = useContext(communityContext);
    const communityId = communityCtx.community === ''
        ? 'dffc0b77-5247-11ee-ac55-ac1203516bd9'
        : communityCtx.community;
    const { data, error } = useQuery(['homeFeed', communityId], async () => {
        const response = await fetch(`${API_URL}/videos?community=` + communityId, {
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
            <Box mx='xl'>
                <Grid>
                    <Grid.Col span={2}>
                        <div style={{ marginTop: 50 }}></div>
                        <HomeNav />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Box>
                            <h2>{t('localTalks')}</h2>
                            <MockLoading>
                                <LocalTalks />
                            </MockLoading>
                            <h2>{t('videos')}</h2>
                            <MockLoading>
                                <SimpleGrid cols={3}>
                                    {data.map(video => {
                                        return (
                                            <VidoeCard
                                                key={video.id}
                                                title={video.title}
                                                thumbnail={video.thumbnail}
                                                cost={video.cost}
                                                username={video.user.username}
                                                userId={video.user.id}
                                                videoId={video.id}
                                                otherCommunity={video.communityId !== communityCtx.community}
                                            />
                                        )
                                    })}
                                </SimpleGrid>
                            </MockLoading>
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <div style={{ marginTop: 50 }}></div>
                        <HomePrice
                            data={[
                                {
                                    label: t('price'),
                                    stats: '0.000006124 ETH',
                                    progress: 100,
                                    color: 'green',
                                    icon: 'up'
                                }
                            ]}
                        />
                    </Grid.Col>
                </Grid>
            </Box>
        )
    }

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Layout>
                {content}
            </Layout>
        </>
    );
};

export default Homepage;