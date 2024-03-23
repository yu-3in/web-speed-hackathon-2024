import { Suspense } from 'react';

import { BookCard, BookCardSkeleton } from '../../../features/book/components/BookCard';
import { useRelease } from '../../../features/release/hooks/useRelease';
import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Space } from '../../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../../lib/date/getDayOfWeekStr';

const ReleaseList: React.FC = () => {
  // TODO: momentやめる
  const todayStr = getDayOfWeekStr(new Date());
  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });

  return (
    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" gap={Space * 2} justify="flex-start">
        {release.books.map((book) => (
          <Suspense key={book.id}>
            <BookCard book={book} />
          </Suspense>
        ))}
      </Flex>
    </Box>
  );
};

const ReleaseListWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={<ReleaseListSkeleton />}>
      <ReleaseList />
    </Suspense>
  );
};

export { ReleaseListWithSuspense as ReleaseList };

const ReleaseListSkeleton: React.FC = () => {
  return (
    <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
      <Flex align="stretch" gap={Space * 2} justify="flex-start">
        <BookCardSkeleton />
        <BookCardSkeleton />
        <BookCardSkeleton />
      </Flex>
    </Box>
  );
};
