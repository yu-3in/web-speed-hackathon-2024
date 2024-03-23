import { Suspense } from 'react';
import styled from 'styled-components';

import type { GetRankingListResponseBook } from '@wsh-2024/schema/src/api/rankings/GetRankingListResponse';

import { Box } from '../../../foundation/components/Box';
import { Flex } from '../../../foundation/components/Flex';
import { Image } from '../../../foundation/components/Image';
import { Link } from '../../../foundation/components/Link';
import { Separator } from '../../../foundation/components/Separator';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { useImage } from '../../../foundation/hooks/useImage';
import { Color, Radius, Space, Typography } from '../../../foundation/styles/variables';

const _Wrapper = styled.li`
  width: 100%;
  list-style: none;
`;

const _Link = styled(Link)`
  width: 100%;
`;

const _ImgWrapper = styled.div`
  width: 96px;
  height: 96px;
  > img {
    border-radius: ${Radius.SMALL};
  }
`;

const _AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  > img {
    border-radius: 50%;
  }
`;

type Props = {
  book: GetRankingListResponseBook;
};

const RankingCard: React.FC<Props> = ({ book }) => {
  const imageUrl = useImage({ height: 96, imageId: book.image.id, width: 96 });
  const authorImageUrl = useImage({ height: 32, imageId: book.author.image.id, width: 32 });

  return (
    <_Wrapper>
      <_Link href={`/books/${book.id}`}>
        <Spacer height={Space * 1.5} />
        <Flex align="flex-start" gap={Space * 2.5} justify="flex-start">
          <_ImgWrapper>
            <Image alt={book.name} height={96} objectFit="cover" src={imageUrl} width={96} />
          </_ImgWrapper>
          <Box width="100%">
            <Flex align="flex-start" direction="column" gap={Space * 1} justify="flex-start">
              <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                {book.name}
              </Text>
              <Text as="p" color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.description}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" gap={Space * 1} justify="flex-end">
              <_AvatarWrapper>
                <Image
                  alt={`${book.author.name}のアイコン`}
                  height={32}
                  objectFit="cover"
                  src={authorImageUrl}
                  width={32}
                />
              </_AvatarWrapper>
              <Text color={Color.MONO_80} typography={Typography.NORMAL12}>
                {book.author.name}
              </Text>
            </Flex>

            <Spacer height={Space * 1} />

            <Flex align="center" justify="flex-end">
              <Text color={Color.Secondary} typography={Typography.NORMAL14} weight="bold">
                この漫画を読む
              </Text>
              <svg
                aria-hidden="true"
                className="svg-icon"
                data-testid="NavigateNextIcon"
                focusable="false"
                style={{
                  color: Color.Secondary,
                  height: '32px',
                  width: '32px',
                }}
                viewBox="0 0 24 24"
              >
                <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </Flex>
          </Box>
        </Flex>
        <Spacer height={Space * 1.5} />
        <Separator />
      </_Link>
    </_Wrapper>
  );
};

const RankingCardWithSuspense: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={null}>
      <RankingCard {...props} />
    </Suspense>
  );
};

export { RankingCardWithSuspense as RankingCard };

export const RankingCardSkeleton: React.FC = () => {
  return <li style={{ height: '155px', width: '100%' }} />;
};
