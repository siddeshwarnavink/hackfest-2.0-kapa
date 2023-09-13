import {
    createStyles,
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Group,
    rem,
    RingProgress,
    Box,
    Modal,
} from '@mantine/core';
import {
    IconLock,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconCashBanknote,
    IconCoin,
    IconRepeat,
} from '@tabler/icons-react';
import React, { useState } from 'react';

import RechargeWallet from '../wallet/rechargeWallet';
import WithdrawWallet from '../wallet/withdrawWallet';
import TransferWallet from '../wallet/transferWallet';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
    title: {
        fontWeight: 700,
    },
    subtitle: {
        fontSize: 14,
        color: theme.colors.gray[6],
        alignItems: 'center'
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        height: rem(90),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',
        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        },
    },
    ring: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        [theme.fn.smallerThan('xs')]: {
            justifyContent: 'center',
            marginTop: theme.spacing.md,
        },
    },

    ringData: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
}));

const WalletActions: React.FC<{ points: any }> = ({ points }) => {
    const { classes, theme } = useStyles();
    const [showModel, setShowModel] = useState<number>(0);

    const walletMenu = [
        { id: 1, title: 'Recharge', icon: IconCoin, color: 'red', component: <RechargeWallet onClose={() => setShowModel(0)} /> },
        { id: 2, title: 'Transfers', icon: IconRepeat, color: 'blue', component: <TransferWallet onClose={() => setShowModel(0)} /> },
        { id: 3, title: 'Refunds', icon: IconReceiptRefund, color: 'green', component: <p>No failed transactions found.</p> },
        { id: 4, title: 'Receipts', icon: IconReceipt, color: 'teal', component: <p>No receipts found.</p> },
        { id: 5, title: 'Taxes', icon: IconReceiptTax, color: 'cyan', component: <p>No tax records found.</p> },
        { id: 6, title: 'Withdraw', icon: IconCashBanknote, color: 'orange', component: <WithdrawWallet onClose={() => setShowModel(0)} /> },
    ];

    const items = walletMenu.map((item) => (
        <UnstyledButton key={item.id} className={classes.item} onClick={() => setShowModel(item.id)}>
            <item.icon color={theme.colors[item.color][6]} size='2rem' />
            <Text size='xs' mt={7}>
                {item.title}
            </Text>
        </UnstyledButton>
    ));

    const selectedMenu = walletMenu.find(menu => menu.id === showModel);
    return (
        <>
            <Modal
                opened={showModel > 0}
                onClose={() => setShowModel(0)}
                title={(
                    <>
                        <Text fz='md' fw='bold'>{selectedMenu ? selectedMenu.title : ''}</Text>
                        <Text c='dimmed' className={classes.subtitle}>
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
                {selectedMenu ? selectedMenu.component : null}
            </Modal>
            <Card withBorder radius='md' className={classes.card}>
                <Box mb='sm'>
                    <Text className={classes.title}>My wallet</Text>
                    <Text c='dimmed' className={classes.subtitle}>
                        <IconLock size={14} />{' '}
                        Encrypted with blockchain
                    </Text>
                </Box>
                <Group>
                    <div className={classes.ring}>
                        <RingProgress
                            roundCaps
                            thickness={6}
                            sections={[{ value: 100, color: 'blue' }]}
                            label={
                                <div className={classes.ringData}>
                                    <img src='/images/Coin.svg' width={30} />
                                    <Text ta='center' fz='xs'>
                                        {points}
                                    </Text>
                                </div>
                            }
                        />
                    </div>
                </Group>
                <SimpleGrid cols={3} mt='md'>
                    {items}
                </SimpleGrid>
            </Card>
        </>
    );
}

export default WalletActions;