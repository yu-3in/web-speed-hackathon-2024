import { Suspense } from 'react';

import { BookListItem } from '../../../features/book/components/BookListItem';
import { Flex } from '../../../foundation/components/Flex';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';
import { normalizeString } from '../../../lib/filter/isContains';
import { useSearchBooks } from '../hooks/useSearchBooks';

type Props = {
  keyword: string;
};

function isKana(str: string) {
  return /^[\u3040-\u30FF]+$/.test(str);
}

const SearchResult: React.FC<Props> = ({ keyword }) => {
  const keywordNormalized = normalizeString(keyword);
  let query = {};
  if (isKana(keywordNormalized)) {
    query = { nameRuby: keywordNormalized };
  } else {
    query = { name: keywordNormalized };
  }

  const { data: books } = useSearchBooks({
    query,
  });

  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      <Suspense
        fallback={
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text>
        }
      >
        {books.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
        {books.length === 0 && (
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            関連作品は見つかりませんでした
          </Text>
        )}
      </Suspense>
    </Flex>
  );
};

const SearchResultWithSuspense: React.FC<Props> = ({ keyword }) => {
  return (
    <Suspense fallback={null}>
      <SearchResult keyword={keyword} />
    </Suspense>
  );
};

export { SearchResultWithSuspense as SearchResult };
