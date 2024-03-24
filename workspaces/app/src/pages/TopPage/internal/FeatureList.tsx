import { Suspense } from 'react';

import { FeatureCard, FeatureCardSkeleton } from '../../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../../features/feature/hooks/useFeatureList';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Space } from '../../../foundation/styles/variables';

const FeatureList: React.FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  return (
    <Box height={206} maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
        {featureList.map((feature) => (
          <FeatureCard key={feature.id} book={feature.book} />
        ))}
      </Flex>
    </Box>
  );
};

const FeatureListWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<FeatureListSkeleton />}>
      <FeatureList />
    </Suspense>
  );
};

export { FeatureListWithSuspense as FeatureList };

const FeatureListSkeleton: React.FC = () => {
  return (
    <Box height={206} maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
        <FeatureCardSkeleton />
        <FeatureCardSkeleton />
        <FeatureCardSkeleton />
      </Flex>
    </Box>
  );
};
