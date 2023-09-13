import React, { useContext } from 'react';
import { Box, Checkbox, Container, Grid, Input, Loader, Select, SimpleGrid } from '@mantine/core';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';

import Layout from '@/components/layout';
import VidoeCard from '@/components/videos/videoCard';
import { API_URL } from '@/config/api';
import authContext from '@/context/authContext';
import ProductFilter from '@/components/store/productFilter';
import MockLoading from '@/components/ui/mockLoading';
import { IconSearch } from '@tabler/icons-react';

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
            <Box px='xl'>
                <Grid>
                    <Grid.Col span={2} mr={'md'}>
                        <div style={{ marginTop: 50 }}></div>
                        <ProductFilter />
                    </Grid.Col>

                    <Grid.Col span={8}>
                        <MockLoading>
                            <Grid>
                                <Grid.Col span={5}>
                                    <br />
                                    <Input
                                        icon={<IconSearch size="1rem" />}
                                        placeholder="Search product"
                                    />
                                </Grid.Col>
                                <Grid.Col span={3}>
                                    <Select
                                        label='Sort by'
                                        placeholder="Pick one"
                                        data={['Popularity', 'Price high to low', 'Price low to high']}
                                    />
                                </Grid.Col>
                                <Grid.Col span={3}>
                                    <br />
                                    <Checkbox style={{marginTop: '8px'}} label='Include out of stock.' />
                                </Grid.Col>
                            </Grid>
                            <SimpleGrid cols={3} mt='lg'>
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
                        </MockLoading>
                    </Grid.Col>
                </Grid>

            </Box>
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