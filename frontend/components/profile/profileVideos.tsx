import { createStyles, Card, Text, SimpleGrid, Group, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

import ProfileVideo from './profileVideo';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    title: {
        lineHeight: 1,
    },
}));

interface ProfileVideoProps {
    videos: { id: string; title: string; thumbnail: string; }[];
    userId: string;
}

const ProfileVideos: React.FC<ProfileVideoProps> = ({ videos, userId }) => {
    const { classes } = useStyles();
    return (
        <Card withBorder radius='md' mt='md' className={classes.card}>
            <Group>
                <Text fz='lg' className={classes.title} fw={500}>
                    My videos
                </Text>
                <div style={{ flex: 1 }}></div>
                <Link href={`/profile/${userId}`}>
                    <UnstyledButton variant='outline' color='gray'>
                        <IconChevronRight size="1.2rem" stroke={1.5} />
                    </UnstyledButton>
                </Link>
            </Group>
            <SimpleGrid cols={4} mt='sm'>
                {videos.map(video => {
                    return (
                        <ProfileVideo
                            key={video.id}
                            id={video.id}
                            title={video.title}
                            thumbnail={video.thumbnail}
                        />
                    );
                })}
            </SimpleGrid>
        </Card>
    );
}

export default ProfileVideos;