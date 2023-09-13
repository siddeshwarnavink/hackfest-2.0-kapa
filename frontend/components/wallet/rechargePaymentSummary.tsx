import React, { useEffect, useState } from 'react'
import { Card, Group, Loader, Text } from '@mantine/core';
import { IconCurrencyEthereum } from '@tabler/icons-react';

const RechargePaymentSummary: React.FC<{ amount: number }> = ({ amount }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <Card mb='md' radius='md'>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Text weight='bold'>Payment summary</Text>
                    <Group>
                        <IconCurrencyEthereum width={20} />
                        <Text weight={500}>In ETH: {amount * 0.000006124}</Text>
                    </Group>
                </>
            )}
        </Card>
    );
}

export default RechargePaymentSummary;