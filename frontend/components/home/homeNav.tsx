import { useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight, IconHome, IconFlame, IconArticle, IconAB2 } from '@tabler/icons-react';
import { Box, NavLink, useMantineTheme } from '@mantine/core';

function HomeNav() {
  const theme = useMantineTheme();
  return (
    <Box>
      <NavLink
        label="Home"
        icon={<IconHome color={theme.colors.red[5]} size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
      />

      <NavLink
        label="Hot topics"
        icon={<IconFlame color={theme.colors.blue[5]}  size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="Blockchain" icon={<></>} />
        <NavLink label="Cooking" icon={<></>} />
        <NavLink label="Upgrad" icon={<IconFlame size="1rem" stroke={1.5} />} />
      </NavLink>

      <NavLink
        label="Local talks"
        icon={<IconArticle color={theme.colors.lime[5]} size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
      />
        <NavLink
        label="Community"
        icon={<IconAB2 color={theme.colors.yellow[5]} size="1.2rem" stroke={1.5} />}
        childrenOffset={28}
      />
    </Box>
  );
}

export default HomeNav;