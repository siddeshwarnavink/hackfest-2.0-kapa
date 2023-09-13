import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IconBuildingStore, IconInfoCircle, IconLock, IconMessage, IconTransfer, IconVideo } from '@tabler/icons-react';
import Head from 'next/head';
import { useRouter } from 'next/router';


import Layout from '@/components/layout';
import { Box, Loader, Modal, SimpleGrid, Tabs } from '@mantine/core';
import { fetchOtherProfile } from '@/services/auth';
import VidoeCard from '@/components/videos/videoCard';
import ProfileStats from '@/components/profile/profileStats';

import { createStyles, Card, Avatar, Text, Group, Button, rem } from '@mantine/core';
import AppButton from '@/components/ui/button';
import TransferWallet from '@/components/wallet/transferWallet';
import { API_URL } from '@/config/api';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
}));

interface ProfileCardProps {
    userId: string
    name: string;
    email: string;
    following: boolean;
    stats: { label: string; value: string }[];
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userId, name, stats, email, following }) => {
    const { classes, theme } = useStyles();
    const [showPurchase, setShowPurchase] = useState(false);
    const queryClient = useQueryClient();

    async function followUserHandler() {
        await fetch(`${API_URL}/user/${userId}/follow`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
            }
        });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    }

    async function unfollowUserHandler() {
        await fetch(`${API_URL}/user/${userId}/unfollow`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
            }
        });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    }

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <>
            <Modal
                opened={showPurchase}
                onClose={() => setShowPurchase(false)}
                title={(
                    <>
                        <Text fz='md' fw='bold'>Transfer</Text>
                        <Text c='dimmed'>
                            <IconLock size={14} />{' '}
                            Encrypted with blockchain
                        </Text>
                    </>
                )}
                overlayProps={{
                    color: theme.colors.dark[9],
                    opacity: 0.55,
                    blur: 3,
                }}
            >
                <TransferWallet
                    onClose={() => {
                        setShowPurchase(false);
                    }}
                    to={email}
                />
            </Modal>
            <Card withBorder padding="xl" radius="md" className={classes.card} mr='lg'>
                <Card.Section sx={{ backgroundColor: '#ccc', height: 80 }} />
                <Avatar src='/images/profile-picture.png' size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
                <Text ta="center" fz="lg" fw={500} mt="sm">
                    {name}
                </Text>
                <Group mt="md" position="center" spacing={30}>
                    {items}
                </Group>
                {JSON.parse(localStorage.getItem('auth')).profile.id !== userId ? (
                    <>
                        {!following ? (
                            <AppButton
                                fullWidth
                                radius="md"
                                mt="xl"
                                size="md"
                                onClick={followUserHandler}
                                color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                            >
                                Follow
                            </AppButton>
                        ) : (
                            <Button
                                fullWidth
                                radius="md"
                                mt="xl"
                                size="md"
                                variant='outline'
                                color='red'
                                onClick={unfollowUserHandler}
                            >
                                Unfollow
                            </Button>
                        )}
                        {following ? (
                            <Button.Group style={{ justifyContent: 'center' }} mt='md'>
                                <Button variant='subtle'>
                                    <IconMessage />
                                </Button>
                                <Button variant='subtle' color='green' onClick={() => setShowPurchase(true)}>
                                    <IconTransfer />
                                </Button>
                            </Button.Group>
                        ) : null}
                    </>
                ) : null}
            </Card>
        </>
    );
}

const ProfilePage: React.FC<{}> = () => {
    const router = useRouter();
    const { data, isError, isLoading } = useQuery({
        queryKey: ['profile', router.query.id],
        queryFn: () => fetchOtherProfile(`${router.query.id}`)
    });

    let content = <Loader />;
    if (!isLoading && !isError) {
        content = (
            <Box mt='md'>
                <Tabs defaultValue="videos" orientation="vertical">
                    <Tabs.List w={250}>
                        <ProfileCard
                            name={data.profile.username}
                            email={data.profile.email}
                            stats={[
                                { label: 'Followers', value: data.statistics.followers }
                            ]}
                            userId={`${router.query.id}`}
                            following={data.following}
                        />

                        <Tabs.Tab mt='md' icon={<IconVideo />} value="videos">Videos</Tabs.Tab>
                        <Tabs.Tab icon={<IconBuildingStore />} value="store">Store</Tabs.Tab>
                        <Tabs.Tab icon={<IconInfoCircle />} value="about">About</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="videos">
                        <Box ml='md'>
                            <SimpleGrid cols={3}>
                                {data.videos.map(video => {
                                    return (
                                        <VidoeCard
                                            key={video.id}
                                            title={video.title}
                                            thumbnail={video.thumbnail}
                                            cost={video.cost}
                                            username={data.profile.username}
                                            userId={data.profile.id}
                                            videoId={video.id}
                                        />
                                    )
                                })}
                            </SimpleGrid>
                        </Box>
                    </Tabs.Panel>
                    <Tabs.Panel value="store">
                        <Box ml='md'>
                            No products listed
                        </Box>
                    </Tabs.Panel>
                    <Tabs.Panel value="about">
                        <Box ml='md'>
                            <ProfileStats
                                videos={data.statistics.videos}
                                followers={data.statistics.followers}
                                products={data.statistics.products}
                            />
                        </Box>
                    </Tabs.Panel>
                </Tabs>
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Layout activeNavigation=''>
                {content}
            </Layout>
        </>
    );
};

export default ProfilePage;