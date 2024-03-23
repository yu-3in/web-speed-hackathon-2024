import { Suspense, useId } from 'react';

import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';

import { CoverSection } from './internal/CoverSection';
import { FeatureList } from './internal/FeatureList';
import { RankingList } from './internal/RankingList';
import { ReleaseList } from './internal/ReleaseList';

const TopPage: React.FC = () => {
  const pickupA11yId = useId();
  const rankingA11yId = useId();
  const todayA11yId = useId();

  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
          <div style={{ marginBottom: '16px' }}>
            <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
              ピックアップ
            </Text>
          </div>
          <FeatureList />
        </Box>

        <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" mb={16} width="100%">
          <div style={{ marginBottom: '16px', marginTop: '16px' }}>
            <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
              ランキング
            </Text>
          </div>
          <RankingList />
        </Box>

        <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
          <div style={{ marginBottom: '16px' }}>
            <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
              本日更新
            </Text>
          </div>
          <ReleaseList />
        </Box>
      </Box>
    </Flex>
  );
};

const TopPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <TopPage />
    </Suspense>
  );
};

export { TopPageWithSuspense as TopPage };
