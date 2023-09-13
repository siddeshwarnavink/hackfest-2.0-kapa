import React from 'react';
import {
    Group,
    Avatar,
    Text,
    createStyles,
    Card,
    rem,
    Button,
    UnstyledButton,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colors.dark[0],
    },

    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    label: {
        fontWeight: 700,
        lineHeight: 1,
    },

    lead: {
        fontWeight: 700,
        fontSize: rem(22),
        lineHeight: 1,
    },

    inner: {
        display: 'flex',

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },
}));


interface UserProfileMini {
    username: string;
    email: string;
}

const UserProfileMini: React.FC<UserProfileMini> = ({ username, email }) => {
    const { classes } = useStyles();
    return (
        <Card withBorder radius="md" className={classes.card}>
            <div className={classes.inner}>
                <Group>
                    <Avatar src='/images/profile-picture.png' radius="xl" />
                    <div>
                        <Text size="sm" weight={500}>
                            {username}
                        </Text>

                        <Text color="dimmed" size="xs">
                            {email}
                        </Text>
                    </div>
                    <div style={{ flex: 1 }}></div>
                    <UnstyledButton variant='outline' color='gray'>
                        <IconEdit size="1.2rem" stroke={1.5} />
                    </UnstyledButton>
                </Group>
            </div>
        </Card>
    );
}

export default UserProfileMini;