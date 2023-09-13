import Layout from '@/components/layout';
import { Button, Grid } from '@mantine/core';
import { ChatItem, Input, MessageList } from 'react-chat-elements'

const NeighbourhoodPage: React.FC = () => {
    return (
        <Layout activeNavigation='neighbourhood'>

            <Grid mt='md'>
                <Grid.Col span={4}>
                    <ChatItem
                        avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
                        alt="kursat_avatar"
                        title="Kursat"
                        subtitle="Ok. See you !"
                        date={new Date()}
                        unread={0}
                    />
                    <ChatItem
                        avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
                        alt="kursat_avatar"
                        title="Kursat"
                        subtitle="Ok. See you !"
                        date={new Date()}
                        unread={0}
                    />
                    <ChatItem
                        avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
                        alt="kursat_avatar"
                        title="Kursat"
                        subtitle="Ok. See you !"
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
                                title: 'Kursat',
                                text: 'Give me a message list example !',
                            },
                            {
                                position: 'right',
                                type: 'text',
                                title: 'Emre',
                                text: 'Thats all.',
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
        </Layout>
    );
}

export default NeighbourhoodPage;