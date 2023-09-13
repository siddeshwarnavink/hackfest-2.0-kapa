import { Card, Image, Text, Badge, Button, Group, RangeSlider, Input, Box, Accordion, Checkbox, useMantineTheme } from '@mantine/core';
import { IconPercentage, IconStar, IconTicket } from '@tabler/icons-react';
import MockLoading from '../ui/mockLoading';

function ProductFilter() {
    const theme = useMantineTheme();
    const marks = [
        { value: 20, label: '20' },
        { value: 50, label: '50' },
        { value: 80, label: '80' },
    ];
    return (
        <Card shadow="sm" radius="md" withBorder>
            <Box pb='xl'>
                <Input.Wrapper label='Price range'>
                    <RangeSlider label='Price' defaultValue={[20, 80]} marks={marks} />
                </Input.Wrapper>
                <Accordion defaultValue="userRating" mt='lg'>
                    <Accordion.Item value="userRating" >
                        <Accordion.Control style={{ paddingLeft: 0 }} icon={<IconStar size={14} color={theme.colors.yellow[5]} />}>User rating</Accordion.Control>
                        <Accordion.Panel>
                            <MockLoading>
                                <>
                                    <Checkbox
                                        label="2.5 stars above"
                                    />
                                    <Checkbox
                                        label="1.5 stars above"
                                    />
                                </>
                            </MockLoading>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="offers" >
                        <Accordion.Control style={{ paddingLeft: 0 }} icon={<IconTicket size={14} color={theme.colors.red[5]} />}>Offers</Accordion.Control>
                        <Accordion.Panel>
                            <p>No offers found.</p>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="discount" >
                        <Accordion.Control style={{ paddingLeft: 0 }} icon={<IconPercentage size={14} color={theme.colors.teal[5]} />}>Discount</Accordion.Control>
                        <Accordion.Panel>
                            <p>No discounts found.</p>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Box>
        </Card>
    );
}

export default ProductFilter;