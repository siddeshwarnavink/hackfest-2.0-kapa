import React, { ReactNode, useContext, useState } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    rem,
    Autocomplete,
    Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconUser,
    IconChevronDown,
    IconHome2,
    IconMail,
    IconBuildingStore,
    IconSearch,
    IconCloudUpload,
    IconAB2,
    IconSwitchVertical,
} from '@tabler/icons-react';
import Link from 'next/link';

import authContext from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '@/services/auth';
import { t } from 'i18next';
import SwitchCommunity from './switchCommunity';

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: 'black',
        border: 0,
        borderBottom: '1px solid #171717',
    },
    logo: {
        display: 'flex',
        justifyContent: 'center'
    },

    logoIcon: {
        width: 30
    },

    logoText: {
        fontWeight: 'bold',
        fontSize: '1.2em',
        display: 'block',
        marginLeft: 5
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    user: {
        color: theme.white,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.1
            ),
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
            0.1
        ),
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: rem(38),
        color: theme.white,
        backgroundColor: 'transparent',
        border: 0,
        borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,

        '&:hover': {
            backgroundColor: '#171717',
        },

        '&[data-active]': {
            backgroundColor: '#171717',
            borderColor: '#171717'
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
        width: 350,
    },
}));

interface ILayoutProps {
    children: ReactNode;
    activeNavigation?: '' | 'home' | 'updates' | 'neighbourhood' | 'store' | 'community';
};

const Layout: React.FC<ILayoutProps> = props => {
    const { classes, theme, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const authCtx = useContext(authContext);
    const { data, isError, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile
    });

    function logoutHandler() {
        localStorage.removeItem('auth');
        window.location.replace('/auth');
    }

    return (
        <>
            <div className={classes.header}>
                <Container className={classes.mainSection}>
                    <Group position='apart'>
                        <div className={classes.logo}>
                            <img className={classes.logoIcon} src='/images/Kapa-logo-big.png' alt='Kapa' />
                            <span className={classes.logoText}>Kapa</span>
                        </div>
                        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
                        <Autocomplete
                            className={classes.search}
                            placeholder="Search videos, people"
                            icon={<IconSearch size="1rem" stroke={1.5} />}
                            data={[]}
                        />
                        <Group>
                            <SwitchCommunity />
                            <Link href='/videos/upload'>
                                <UnstyledButton color='dark'>
                                    <IconCloudUpload size={20} />
                                </UnstyledButton>
                            </Link>
                            {!isLoading && !isError ? (
                                <Link href='/profile'>
                                    <Button
                                        color='dark'
                                        leftIcon={<img width={20} src='/images/Coin.svg' />}
                                        radius='xl'
                                    >
                                        {data.profile.points}
                                    </Button>
                                </Link>
                            ) : null}
                            <Menu
                                width={260}
                                position='bottom-end'
                                transitionProps={{ transition: 'pop-top-right' }}
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                                withinPortal
                            >
                                <Menu.Target>
                                    <UnstyledButton
                                        className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                                    >
                                        <Group spacing={7}>
                                            <Avatar src='/images/profile-picture.png' alt='John doe' radius='xl' size={20} />
                                            <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
                                                {authCtx.authData.profile.username}
                                            </Text>
                                            <IconChevronDown size={rem(12)} stroke={1.5} />
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        icon={<IconHeart size='0.9rem' color={theme.colors.red[6]} stroke={1.5} />}
                                    >
                                        Liked posts
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconStar size='0.9rem' color={theme.colors.yellow[6]} stroke={1.5} />}
                                    >
                                        Saved posts
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconMessage size='0.9rem' color={theme.colors.blue[6]} stroke={1.5} />}
                                    >
                                        Your comments
                                    </Menu.Item>

                                    <Menu.Label>Settings</Menu.Label>
                                    <Link href='/settings' passHref style={{ textDecoration: 'none' }}>
                                        <Menu.Item
                                            icon={<IconSettings size='0.9rem' stroke={1.5} />}
                                        >
                                            Settings
                                        </Menu.Item>
                                    </Link>
                                    <Link href='/profile' passHref style={{ textDecoration: 'none' }}>
                                        <Menu.Item component='a' icon={<IconUser size='0.9rem' stroke={1.5} />}>
                                            My profile
                                        </Menu.Item>
                                    </Link>
                                    <Menu.Item onClick={logoutHandler} color='red' icon={<IconLogout size='0.9rem' stroke={1.5} />}>Logout</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>
                </Container>
                <Container>
                    <Tabs
                        defaultValue={props.activeNavigation}
                        variant='outline'
                        classNames={{
                            root: classes.tabs,
                            tabsList: classes.tabsList,
                            tab: classes.tab,
                        }}
                    >
                        <Tabs.List>
                            <Link href='/' style={{ textDecoration: 'none' }}>
                                <Tabs.Tab value='home' icon={<IconHome2 size={18} color={props.activeNavigation === 'home' ? theme.colors.blue[5] : theme.colors.gray[5]} />}>
                                    {t('home')}
                                </Tabs.Tab>
                            </Link>
                            <Link href='/community' style={{ textDecoration: 'none' }}>
                                <Tabs.Tab value='community' icon={<IconAB2 size={18} color={props.activeNavigation === 'community' ? theme.colors.blue[5] : theme.colors.gray[5]} />}>
                                    {t('community')}
                                </Tabs.Tab>
                            </Link>
                            {/* <Link href='/updates' style={{ textDecoration: 'none' }}>
                                <Tabs.Tab value='updates' icon={<IconAt size={18} color={props.activeNavigation === 'updates' ? theme.colors.blue[5] : theme.colors.gray[5]} />}>
                                    Updates
                                </Tabs.Tab>
                            </Link> */}
                            <Link href='/neighbourhood' style={{ textDecoration: 'none' }}>
                                <Tabs.Tab value='neighbourhood' icon={<IconMail size={18} color={props.activeNavigation === 'neighbourhood' ? theme.colors.blue[5] : theme.colors.gray[5]} />}>
                                    {t('neighbourhood')}
                                </Tabs.Tab>
                            </Link>
                            <Link href='/store' style={{ textDecoration: 'none' }}>
                                <Tabs.Tab value='store' icon={<IconBuildingStore size={18} color={props.activeNavigation === 'store' ? theme.colors.blue[5] : theme.colors.gray[5]} />}>
                                    {t('store')}
                                </Tabs.Tab>
                            </Link>
                        </Tabs.List>
                    </Tabs>
                </Container>
            </div>
            {/* <Container> */}
            {props.children}
            {/* </Container> */}
        </>
    );
}

Layout.defaultProps = {
    activeNavigation: 'home'
};

export default Layout;