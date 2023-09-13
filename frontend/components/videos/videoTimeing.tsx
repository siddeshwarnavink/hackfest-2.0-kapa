import React from 'react';
import { IconClockHour4 } from '@tabler/icons-react';
import { createStyles, Text } from '@mantine/core';


const useStyles = createStyles(() => ({
    timeing: {
        display: 'flex',
        alignItems: 'center',
    }
}));


interface VidoeTimeingProps {
    timeing: string;
};

const VidoeTimeing: React.FC<VidoeTimeingProps> = props => {
    const { classes, theme } = useStyles();
    return (
        <div className={classes.timeing}>
            <IconClockHour4 stroke='.2em' width={15} color={theme.colors.gray[6]} />
            <Text c='dimmed'>{props.timeing}</Text>
        </div>
    );
}

export default VidoeTimeing;