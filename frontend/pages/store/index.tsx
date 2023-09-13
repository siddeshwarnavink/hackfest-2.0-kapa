import React, { useContext } from 'react';
import { Loader, SimpleGrid } from '@mantine/core';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';

import Layout from '@/components/layout';
import VidoeCard from '@/components/videos/videoCard';
import { API_URL } from '@/config/api';
import authContext from '@/context/authContext';

const Storepage: React.FC<{}> = () => {
    const authCtx = useContext(authContext);
    const { data, error, isLoading } = useQuery(['store'], async () => {
        const response = await fetch(`${API_URL}/store`, {
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
                <h1>Store</h1>
                <SimpleGrid cols={3}>
                    {data.map(video => {
                        return (
                            <VidoeCard
                                key={video.id}
                                product
                                title={video.productName}
                                thumbnail={video.thumbnail}
                                cost={video.cost}
                                username={video.creator.username}
                                userId={video.creator.id}
                                videoId={video.id}
                                tags={video.tags}
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
                <title>Store</title>
            </Head>
            <Layout activeNavigation='store'>
                {content}
            </Layout>
        </>
    );
};

export default Storepage;