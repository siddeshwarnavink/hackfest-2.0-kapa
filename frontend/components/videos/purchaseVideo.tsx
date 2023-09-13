import { useState } from 'react';
import { IconLock } from '@tabler/icons-react';
import { AspectRatio, Image, Overlay, Text, Box, createStyles, Modal } from '@mantine/core';

import { API_URL } from '@/config/api';
import AppButton from '../ui/button';
import TransferWallet from '../wallet/transferWallet';

interface PurchaseVideoProps {
    thumbnail: string;
    points: number;
    user: {
        id: string;
        username: string;
        email: string;
    };
    videoId: string;
}

const useStyles = createStyles((theme) => ({
    overlay: {
        textAlign: 'center'
    }
}));

const PurchaseVideo: React.FC<PurchaseVideoProps> = ({ thumbnail, points, user, videoId }) => {
    const { classes, theme } = useStyles();
    const [showPurchase, setShowPurchase] = useState(false);

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
                    amount={points}
                    to={user.email}
                    payload={videoId}
                    transferType='video'
                />
            </Modal>
            <AspectRatio ratio={16 / 9} maw={1200} mx="auto">
                <Image
                    src={`${API_URL}/${thumbnail}`}
                />
                <Overlay blur={15} center>
                    <Box className={classes.overlay}>
                        <Text size={20} fw='bold'>Unlock the video</Text>
                        <Text>This video cost {points} points</Text>

                        <AppButton color="red" radius="xl" mt='md' onClick={() => setShowPurchase(true)}>
                            Unlock
                        </AppButton>
                    </Box>
                </Overlay>
            </AspectRatio>
        </>
    );
}

export default PurchaseVideo;