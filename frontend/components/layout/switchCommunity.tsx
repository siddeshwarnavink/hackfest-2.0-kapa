import { API_URL } from "@/config/api";
import authContext from "@/context/authContext";
import { UnstyledButton } from "@mantine/core";
import { SpotlightAction, SpotlightProvider, spotlight } from '@mantine/spotlight';
import { IconAB2, IconSearch, IconSwitchVertical } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const SwitchCommunity: React.FC = () => {
    const authCtx = useContext(authContext);
    const { data, error, isLoading } = useQuery(['community'], async () => {
        const response = await fetch(`${API_URL}/community`, {
            headers: {
                'Authorization': 'Bearer ' + authCtx.authData.token
            }
        });
        const data = await response.json();
        return data;
    });

    let content = <></>

    if (!isLoading && !error) {
        const actions: SpotlightAction[] = data.map(community => {
            return {
                title: community.name,
                onTrigger: () => console.log('Home'),
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