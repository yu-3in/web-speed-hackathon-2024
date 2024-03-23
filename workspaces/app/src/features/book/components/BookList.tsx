import type { GetAuthorResponse } from '@wsh-2024/schema/src/api/authors/GetAuthorResponse';

import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

import { BookListItem } from './BookListItem';

type Props = {
  author: GetAuthorResponse;
};

const BookList: React.FC<Props> = ({ author }) => {
  return (
    <Flex align="center" as="ul" direction="column" justify="center">
      {author.books.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
      {author.books.length === 0 && (
        <>
          <Spacer height={Space * 2} />
          <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
            この作者の作品はありません
          </Text>
        </>
      )}
    </Flex>
  );
};

const BookListWithSuspense: React.FC<Props> = ({ author }) => {
  return <BookList author={author} />;
};

export { BookListWithSuspense as BookList };
