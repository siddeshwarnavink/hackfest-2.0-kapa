import React from 'react';
import { IconStar } from '@tabler/icons-react';
import { createStyles, Text } from '@mantine/core';


const useStyles = createStyles((theme) => ({
    rating: {
        display: 'flex',
        alignItems: 'center',
    }
}));


interface VidoeStarRatingProps {
    rating: string;
};

const VidoeStarRating: React.FC<VidoeStarRatingProps> = props => {
    const { classes, theme } = useStyles();
    return (
        <div className={classes.rating}>
            <IconStar stroke='.2em' width={15} color={theme.colors.blue[5]} />
            <Text>{props.rating}</Text>
            <Text c='dimmed'>/3</Text>
        </div>
    );
}

export default VidoeStarRating;