import { Suspense } from 'react';

import { RankingCard, RankingCardSkeleton } from '../../../features/ranking/components/RankingCard';
import { useRankingList } from '../../../features/ranking/hooks/useRankingList';
import { Box } from '../../../foundation/components/Box';

const RankingList: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  return (
    <>
      {rankingList.map((ranking) => (
        <Suspense key={ranking.id}>
          <RankingCard book={ranking.book} />
        </Suspense>
      ))}
    </>
  );
};

const RankingListWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<RankingListSkeleton />}>
      <RankingList />
    </Suspense>
  );
};

export { RankingListWithSuspense as RankingList };

const RankingListSkeleton: React.FC = () => {
  return (
    <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
      <ul
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          listStyle: 'none',
        }}
      >
        <RankingCardSkeleton />
        <RankingCardSkeleton />
        <RankingCardSkeleton />
      </ul>
    </Box>
  );
};
