import { useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight, IconHome, IconFlame, IconArticle, IconAB2 } from '@tabler/icons-react';
import { Box, NavLink, useMantineTheme } from '@mantine/core';
import { t } from 'i18next';
import MockLoading from '../ui/mockLoading';

function HomeNav() {
  const theme = useMantineTheme();
  return (
    <Box>
      <NavLink
        label={t('home')}
        icon={<IconHome color={theme.colors.red[5]} size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
      />

      <NavLink
        label={t('hotTopics')}
        icon={<IconFlame color={theme.colors.blue[5]} size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <MockLoading>
          <NavLink label="Blockchain" icon={<></>} />
          <NavLink label="Cooking" icon={<></>} />
          <NavLink label="Upgrad" icon={<IconFlame size="1rem" stroke={1.5} />} />
        </MockLoading>
      </NavLink>

      <NavLink
        label={t('localTalks')}
        icon={<IconArticle color={theme.colors.lime[5]} size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
      />
      <NavLink
        label={t('community')}
        icon={<IconAB2 color={theme.colors.yellow[5]} size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
      />
    </Box>
  );
}

export default HomeNav;