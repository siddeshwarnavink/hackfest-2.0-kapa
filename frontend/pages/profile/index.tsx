import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';

import Layout from '@/components/layout';
import UserProfileMini from '@/components/profile/userProfileMini';
import { Box, Grid, Divider, Loader } from '@mantine/core';
import WalletActions from '@/components/profile/walletActions';
import ProfileStats from '@/components/profile/profileStats';
import ProfileSettings from '@/components/profile/profileSettings';
import ProfileVideos from '@/components/profile/profileVideos';
import { fetchProfile } from '@/services/auth';

const ProfilePage: React.FC<{}> = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile
    });

    let content = <Loader />;
    if (!isLoading && !isError) {
        content = (
            <Box mt='md'>
                <Grid>
                    <Grid.Col span={8}>
                        <UserProfileMini
                            username={data.profile.username}
                            email={data.profile.email}
                        />
                        <ProfileStats
                            videos={data.statistics.videos}
                            followers={data.statistics.followers}
                            products={data.statistics.products}
                        />
                        <Divider />
                        <ProfileSettings />
                        <ProfileVideos
                            userId={data.profile.id}
                            videos={data.videos}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <WalletActions
                            points={data.profile.points}
                        />
                    </Grid.Col>
                </Grid>
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title>My profile</title>
            </Head>
            <Layout activeNavigation=''>
                {content}
            </Layout>
        </>
    );
};

export default ProfilePage;