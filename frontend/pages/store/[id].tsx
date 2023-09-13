import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Player } from 'video-react';
import { Avatar, Box, Button, Container, Group, Loader, SimpleGrid, Text, createStyles, Image } from '@mantine/core';
import Head from 'next/head';

import Layout from '@/components/layout';
import authContext from '@/context/authContext';
import { API_URL } from '@/config/api';
import AppButton from '@/components/ui/button';
import VidoeStarRating from '@/components/videos/videoStarRating';
import moment from 'moment';
import PurchaseVideo from '@/components/videos/purchaseVideo';
import Review from '@/components/review';
import MockLoading from '@/components/ui/mockLoading';
import { IconPlus, IconShoppingBag } from '@tabler/icons-react';
import VidoeCard from '@/components/videos/videoCard';

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
    const { classes, theme } = useStyles();
    const queryClient = useQueryClient();

    let content = <Loader />;
    if (error) content = <div>Error loading data</div>;
    else if (data) {
        content = (
            <Container size='xl'>
                <Head>
                    <title>{data.productName}</title>
                </Head>
                <div style={{ marginTop: 10 }}></div>
                <SimpleGrid cols={3}>
                    <Image src={`${API_URL}/${data.thumbnail}`} radius='md' />
                    <div style={{ marginLeft: 15, marginTop: 10 }}>
                        <h1 style={{ margin: 0, padding: 0 }}>{data.productName}</h1>
                        <div style={{ display: 'flex' }}>
                            <VidoeStarRating rating={`${data.review.avgRating}`} />
                            <Text ml='sm' c='dimmed'>12 Reviews</Text>
                        </div>
                        <Text color={theme.colors.blue[5]} mt='md'>Special price</Text>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/images/Coin.svg" width={30} />
                            <Text fw='bold' size={20}>{data.cost}</Text>
                        </div>
                        <p>{data.productDescription}</p>
                        <Box mt='lg'>
                            <AppButton leftIcon={<IconShoppingBag />}>Buy now</AppButton>
                            <Button leftIcon={<IconPlus />} ml='sm' variant='outline'>Add to wishlist</Button>
                        </Box>
                    </div>

                </SimpleGrid>
                <MockLoading>
                    <Review payload={`${router.query.id}`} />
                </MockLoading>
                <MockLoading>
                    <h3>Also check out</h3>
                    <SimpleGrid cols={5} mt='lg'>
                        {data.alsoCheckout.map(video => {
                            return (
                                <VidoeCard
                                    key={video.id}
                                    product
                                    minimal
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
            </Container>
        )
    }


    return (
        <Layout activeNavigation='store'>
            {content}
        </Layout>
    );
}

export default ProductDetailPage;