import { API_URL } from "@/config/api";
import authContext from "@/context/authContext";
import communityContext from "@/context/community";
import { UnstyledButton } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { SpotlightAction, SpotlightProvider, spotlight } from '@mantine/spotlight';
import { IconAB2, IconSearch, IconSwitchVertical } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

const SwitchCommunity: React.FC = () => {
    const authCtx = useContext(authContext);
    const communityCtx = useContext(communityContext);
    const queryClient = useQueryClient();
    const { data, error, isLoading } = useQuery(['community'], async () => {
        const response = await fetch(`${API_URL}/community`, {
            headers: {
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        const data = await response.json();
        if (data.length > 0 && communityCtx.community === '') {
            communityCtx.setCommunity(data[0].id);
            communityCtx.setCommunityName(data[0].name);
            notifications.show({
                title: 'Community',
                message: `Currently on "${data[0].name}" community`,
            });
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['homeFeed'] });
            }, 500);
        }
        return data;
    });

    let content = <></>

    const switchCommunity = (community: any) => {
        queryClient.invalidateQueries({ queryKey: ['homeFeed', communityCtx.community] });
        communityCtx.setCommunity(community.id);
        communityCtx.setCommunityName(community.name);
        console.log(`Switching to ${community.name} ${community.id}`);
        notifications.show({
            title: 'Community',
            message: `Currently on "${community.name}" community`,
        });
    };

    if (!isLoading && !error) {
        const actions: SpotlightAction[] = data.map(community => {
            return {
                title: community.name,
                description: communityCtx.communityName === community.name ? 'Current active' : undefined,
                onTrigger: () => switchCommunity(community),
                icon: <IconAB2 size="1.2rem" />,
            };
        })


        content = (
            <SpotlightProvider
                actions={actions}
                searchIcon={<IconSearch size="1.2rem" />}
                searchPlaceholder="Search community..."
                shortcut="mod + shift + 1"
                nothingFoundMessage="Nothing found..."
            >
                <UnstyledButton color='dark' onClick={spotlight.open}>
                    <IconSwitchVertical size={20} />
                </UnstyledButton>
                {communityCtx.communityName}
            </SpotlightProvider>
        );
    }

    return content;

}

export default SwitchCommunity;