import { createStyles, Card, Group, Switch, Text, rem, Divider } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    item: {
        '& + &': {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },
    },

    switch: {
        '& *': {
            cursor: 'pointer',
        },
    },

    title: {
        lineHeight: 1,
    },
}));


const ProfileSettings = () => {
    const { classes } = useStyles();
    return (
        <Card withBorder radius='md' mt='md' className={classes.card}>
            <Text fz='lg' className={classes.title} fw={500}>
                Privacy settings
            </Text>
            <Text fz='xs' c='dimmed' mt={3} mb='xl'>
            <IconLock size={14} />{' '}
            Only you
            </Text>
            <Group position='apart' className={classes.item} noWrap spacing='xl'>
                <div>
                    <Text>Messages</Text>
                    <Text size='xs' color='dimmed'>
                        Direct messages you have received from other users
                    </Text>
                </div>
                <Switch checked={true} onLabel='ON' offLabel='OFF' className={classes.switch} size='lg' />
            </Group>

            <Group position='apart' className={classes.item} noWrap spacing='xl'>
                <div>
                    <Text>Other community</Text>
                    <Text size='xs' color='dimmed'>
                        Make yourself visible in other communities.
                    </Text>
                </div>
                <Switch checked={false} onLabel='ON' offLabel='OFF' className={classes.switch} size='lg' />
            </Group>
        </Card>
    );
}

export default ProfileSettings;