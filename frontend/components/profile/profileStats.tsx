import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconShoppingBag, IconPlayerPlay, IconUsers } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }
}));

interface ProfileStatsProps {
    videos: any;
    followers: any;
    products: any;
};

const ProfileStats: React.FC<ProfileStatsProps> = ({ videos, followers, products }) => {
    const { classes } = useStyles();

    return (
        <SimpleGrid my='md' cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Paper withBorder p='md' radius='md' key={'<u ttiel'} className={classes.card}>
                <Group position='apart'>
                    <div>
                        <Text c='dimmed' tt='uppercase' fw={700} fz='xs'>
                            Videos
                        </Text>
                        <Text fw={700} fz='xl'>
                            {videos}
                        </Text>
                    </div>
                    <ThemeIcon
                        color='gray'
                        variant='light'
                        sx={(theme) => ({ color: theme.colors.teal[6] })}
                        size={38}
                        radius='md'
                    >
                        <IconPlayerPlay size='1.8rem' stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
            <Paper withBorder p='md' radius='md' key={'<u ttiel'} className={classes.card}>
                <Group position='apart'>
                    <div>
                        <Text c='dimmed' tt='uppercase' fw={700} fz='xs'>
                            Followers
                        </Text>
                        <Text fw={700} fz='xl'>
                            {followers}
                        </Text>
                    </div>
                    <ThemeIcon
                        color='gray'
                        variant='light'
                        sx={(theme) => ({ color: theme.colors.pink[6] })}
                        size={38}
                        radius='md'
                    >
                        <IconUsers size='1.8rem' stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
            <Paper withBorder p='md' radius='md' key={'<u ttiel'} className={classes.card}>
                <Group position='apart'>
                    <div>
                        <Text c='dimmed' tt='uppercase' fw={700} fz='xs'>
                            Products
                        </Text>
                        <Text fw={700} fz='xl'>
                            {products}
                        </Text>
                    </div>
                    <ThemeIcon
                        color='gray'
                        variant='light'
                        sx={(theme) => ({ color: theme.colors.indigo[6] })}
                        size={38}
                        radius='md'
                    >
                        <IconShoppingBag size='1.8rem' stroke={1.5} />
                    </ThemeIcon>
                </Group>
            </Paper>
        </SimpleGrid>
    );
};

export default ProfileStats;