import React, { useContext } from 'react';
import { Loader, SimpleGrid } from '@mantine/core';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';

import Layout from '@/components/layout';
import VidoeCard from '@/components/videos/videoCard';
import { API_URL } from '@/config/api';
import authContext from '@/context/authContext';

const Homepage: React.FC<{}> = () => {
    const authCtx = useContext(authContext);
    const { data, error, isLoading } = useQuery(['homeFeed'], async () => {
        const response = await fetch(`${API_URL}/videos`, {
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
                <h1>My feed</h1>
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
                            />
                        )
                    })}
                </SimpleGrid>
            </>
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