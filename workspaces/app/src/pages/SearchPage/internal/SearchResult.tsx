import { Suspense, useMemo } from 'react';

import { BookListItem } from '../../../features/book/components/BookListItem';
import { useBookList } from '../../../features/book/hooks/useBookList';
import { Flex } from '../../../foundation/components/Flex';
import { Text } from '../../../foundation/components/Text';
import { Color, Typography } from '../../../foundation/styles/variables';
import { normalizeString } from '../../../lib/filter/isContains';

type Props = {
  keyword: string;
};

const SearchResult: React.FC<Props> = ({ keyword }) => {
  const { data: books } = useBookList({ query: {} });

  const relatedBooks = useMemo(() => {
    // キーワードが空の場合は何もフィルタリングしない
    if (keyword === '') {
      return books;
    }

    // キーワードを事前に正規化
    const normalizedKeyword = normalizeString(keyword);

    // 正規化されたキーワードを使ってフィルタリング
    return books.filter((book) => {
      // book.name と book.nameRuby を正規化して検索
      const normalizedBookName = normalizeString(book.name);
      const normalizedBookNameRuby = normalizeString(book.nameRuby);

      return normalizedBookName.includes(normalizedKeyword) || normalizedBookNameRuby.includes(normalizedKeyword);
    });
  }, [books, keyword]);

  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      <Suspense
        fallback={
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            「{keyword}」を検索中...
          </Text>
        }
      >
        {relatedBooks.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
        {relatedBooks.length === 0 && (
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
