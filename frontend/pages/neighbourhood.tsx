import Layout from '@/components/layout';
import { Button, Container, Grid } from '@mantine/core';
import { ChatItem, Input, MessageList } from 'react-chat-elements'

const NeighbourhoodPage: React.FC = () => {
    return (
        <Layout activeNavigation='neighbourhood'>
            <Container>

                <Grid mt='md'>
                    <Grid.Col span={4}>
                        <ChatItem
                            avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
                            alt="kursat_avatar"
                            title="Vinod"
                            subtitle="Iru machan! Varen"
                            date={new Date()}
                            unread={0}
                        />
                        <ChatItem
                            avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
                            alt="kursat_avatar"
                            title="Rahul"
                            subtitle="Cool bruh :)"
                            date={new Date()}
                            unread={0}
                        />
                        <ChatItem
                            avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
                            alt="kursat_avatar"
                            title="Kursat"
                            subtitle="I'll be there in 10 mins"
                            date={new Date()}
                            unread={0}
                        />

                    </Grid.Col>
                    <Grid.Col span={8}>
                        <MessageList
                            className='message-list'
                            lockable={true}
                            toBottomHeight={'100%'}
                            dataSource={[
                                {
                                    position: 'left',
                                    type: 'text',
                                    title: 'Vinod',
                                    text: 'Amma making ulundhu vadai ;) !',
                                },
                                {
                                    position: 'right',
                                    type: 'text',
                                    title: 'Emre',
                                    text: 'Iru machan! Varen',
                                },
                            ]}
                        />

                        <Input
                            placeholder="Type here..."
                            multiline={true}
                            rightButtons={<Button>Send</Button>}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </Layout>
    );
}

export default NeighbourhoodPage;
