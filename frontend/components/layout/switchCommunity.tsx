import { API_URL } from "@/config/api";
import authContext from "@/context/authContext";
import communityContext from "@/context/community";
import { UnstyledButton } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { SpotlightAction, SpotlightProvider, spotlight } from '@mantine/spotlight';
import { IconAB2, IconSearch, IconSwitchVertical } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const SwitchCommunity: React.FC = () => {
    const authCtx = useContext(authContext);
    const communityCtx = useContext(communityContext);
    const { data, error, isLoading } = useQuery(['community'], async () => {
        const response = await fetch(`${API_URL}/community`, {
            headers: {
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        const data = await response.json();
        if (data.length > 0 && communityCtx.community !== data[0].id) {
            communityCtx.setCommunity(data[0].id);
            notifications.show({
                message: `Currently on "${data[0].name}" community`,
            });
        }
        return data;
    });

    let content = <></>

    if (!isLoading && !error) {
        const actions: SpotlightAction[] = data.map(community => {
            return {
                title: community.name,
                onTrigger: () => {
                    communityCtx.setCommunity(community.id);
                    notifications.show({
                        message: `Currently on "${community.name}" community`,
                    });
                },
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
            </SpotlightProvider>
        );
    }

    return content;

}

export default SwitchCommunity;