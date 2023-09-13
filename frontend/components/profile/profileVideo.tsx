import Link from 'next/link';
import { API_URL } from '@/config/api';
import { createStyles, Card, Image, Text } from '@mantine/core';

const useStyles = createStyles(() => ({

    title: {
        lineHeight: 1,
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

}));

const ProfileVideo: React.FC<{ id: string; title: string; thumbnail: string }> = ({ id, title, thumbnail }) => {
    const { classes } = useStyles();

    return (
        <Link href={`/videos/${id}`} style={{ color: 'unset', textDecoration: 'none' }}>
            <Card>
                <Card.Section>
                    <Image src={`${API_URL}/${thumbnail}`} alt='' height={100} />
                </Card.Section>
                <Card.Section mt='sm'>
                    <Text fz='sm' fw={700} className={classes.title}>
                        {title}
                    </Text>
                </Card.Section>
            </Card>
        </Link>

    );
}

export default ProfileVideo;