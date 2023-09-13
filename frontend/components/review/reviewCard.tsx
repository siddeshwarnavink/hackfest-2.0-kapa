import { Avatar, Button, Card, Group, Image, Rating, Text } from '@mantine/core';
import Link from 'next/link';

interface ReviewCardProps {
    author: { username: string; id: string; };
    message: string;
    rating: number;
    userAuthor?: boolean
}

const ReviewCard: React.FC<ReviewCardProps> = ({ author, message, rating, userAuthor }) => {
    return (
        <Card radius='lg'>
            <Group mr='md'>
                <Avatar src='/images/profile-picture.png' radius="xl" />
                <div style={{ flex: 1 }}>
                    {userAuthor ? (
                        <Text size="sm" weight={500}>
                            You
                        </Text>
                    ) : (
                        <Link href={`/profile/${author.id}`}>
                            <Text size="sm" weight={500}>
                                {author.username}
                            </Text>
                        </Link>
                    )}
                </div>
            </Group>
            <Text mt="xs" size="sm">
                {message}
            </Text>
            <Rating value={rating} count={3} readOnly />
            {userAuthor ? (
                <Button mt='md' compact variant='outline'>Edit</Button>
            ) : null}
        </Card >
    );
}

ReviewCard.defaultProps = {
    userAuthor: false
};

export default ReviewCard;