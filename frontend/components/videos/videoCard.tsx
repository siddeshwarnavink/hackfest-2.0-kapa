import { createStyles, Card, Image, Text, Group, rem, Avatar, Badge, Box, Tooltip } from '@mantine/core';
import VidoeStarRating from './videoStarRating';
import VidoeTimeing from './videoTimeing';
import Link from 'next/link';
import { API_URL } from '@/config/api';
import { IconAB2, IconSparkles } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },

    caption: {
        width: '75%'
    },

    title: {
        lineHeight: 1,
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    subtitle: {
        fontSize: 14,
        lineHeight: 1.5,
    }
}));

interface VidoeCardProps {
    title: string;
    thumbnail: string;
    cost: number;
    username: string;
    userId: string;
    videoId: string;
    product?: boolean;
    minimal?: boolean;
    tags?: string;
    otherCommunity?: boolean;
}

const VidoeCard: React.FC<VidoeCardProps> = props => {
    const { classes, theme } = useStyles();
    return (
        <Card withBorder padding='lg' className={classes.card} radius='md'>
            <Card.Section>
                <Image
                    src={`${API_URL}/${props.thumbnail}`}
                    alt=''
                    height={props.product ? 300 : 130}
                    fit='fill'
                />
            </Card.Section>

            <Link href={(props.product ? '/store/' : '/videos/') + props.videoId} style={{ textDecoration: 'none', color: 'unset' }}>
                <Group mt='xl'>
                    {!props.minimal ? (
                        <div>
                            <Avatar />
                        </div>
                    ) : null}
                    <div className={classes.caption}>
                        <Text fw={700} className={classes.title}>
                            {props.title}
                        </Text>
                        {!props.minimal ? (
                            <Text c='dimmed' className={classes.subtitle}>
                                By <Link href={`/profile/${props.userId}`}>{props.username}</Link>
                            </Text>
                        ) : null}
                    </div>
                </Group>
            </Link>
            {props.tags && !props.minimal ? (
                <Box mt='lg'>
                    <Text c='dimmed' fs='italic'>
                        <IconSparkles size={14} style={{ marginRight: '5px' }} />
                        AI suggests that this is a '{props.tags}'
                    </Text>
                </Box>
            ) : null}
            <Group style={{ width: '100%' }} mt='sm'>
                <Group>
                    <VidoeStarRating rating='2.3' />
                    {/* <VidoeTimeing timeing='2h' /> */}
                    {props.otherCommunity ? (
                        <Tooltip label="This video is from other community">
                            <IconAB2 size={16} color={theme.colors.violet[5]} />
                        </Tooltip>
                    ) : null}
                </Group>
                <div style={{ flex: 1 }}></div>
                {props.cost > 0 ? (
                    <Badge leftSection={<img width={16} src='/images/Coin.svg' />}>
                        {props.cost}
                    </Badge>
                ) : (
                    <Badge color={theme.colors.blue[5]}>Free</Badge>
                )}
            </Group>
        </Card>
    );
}

VidoeCard.defaultProps = {
    product: false,
    minimal: false,
    otherCommunity: false
};

export default VidoeCard;