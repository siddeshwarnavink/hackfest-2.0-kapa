import { RingProgress, Text, SimpleGrid, Paper, Center, Group } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import MockLoading from '../ui/mockLoading';

interface StatsRingProps {
  data: {
    label: string;
    stats: string;
    progress: number;
    color: string;
    icon: 'up' | 'down';
  }[];
}

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

function HomePrice({ data }: StatsRingProps) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <MockLoading>
        <Paper withBorder radius="md" p="xs" key={stat.label} style={{ width: 110 }}>
          <Group>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: stat.progress, color: stat.color }]}
              label={
                <Center>
                  <Icon size="1.4rem" stroke={1.5} />
                </Center>
              }
            />

            <div>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {stat.label}
              </Text>
              <Text weight={700} size="sm">
                {stat.stats}
              </Text>
            </div>
          </Group>
        </Paper>
      </MockLoading>
    );
  });

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}

export default HomePrice;