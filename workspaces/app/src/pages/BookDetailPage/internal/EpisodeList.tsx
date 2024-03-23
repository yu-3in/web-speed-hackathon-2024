import { useAtom } from 'jotai';
import { Suspense, useCallback, useMemo } from 'react';

import { FavoriteBookAtomFamily } from '../../../features/book/atoms/FavoriteBookAtomFamily';
import { EpisodeListItem } from '../../../features/episode/components/EpisodeListItem';
import { useEpisodeList } from '../../../features/episode/hooks/useEpisodeList';
import { Flex } from '../../../foundation/components/Flex';
import { Spacer } from '../../../foundation/components/Spacer';
import { Text } from '../../../foundation/components/Text';
import { Color, Space, Typography } from '../../../foundation/styles/variables';

import { BottomNavigator } from './BottomNavigator';

type Props = {
  bookId: string;
};

const EpisodeList: React.FC<Props> = ({ bookId }) => {
  const { data: episodeList } = useEpisodeList({ query: { bookId } });

  const latestEpisode = useMemo(() => episodeList?.find((episode) => episode.chapter === 1), [episodeList]);

  const [isFavorite, toggleFavorite] = useAtom(FavoriteBookAtomFamily(bookId));

  const handleFavClick = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  return (
    <>
      <BottomNavigator
        bookId={bookId}
        isFavorite={isFavorite}
        latestEpisodeId={latestEpisode?.id ?? ''}
        onClickFav={handleFavClick}
      />
      <Flex align="center" as="ul" direction="column" justify="center">
        {episodeList.map((episode) => (
          <Suspense key={episode.id} fallback={null}>
            {' '}
            <EpisodeListItem bookId={bookId} episodeId={episode.id} />
          </Suspense>
        ))}
        {episodeList.length === 0 && (
          <>
            <Spacer height={Space * 2} />
            <Text color={Color.MONO_100} typography={Typography.NORMAL14}>
              この作品はまだエピソードがありません
            </Text>
          </>
        )}
      </Flex>
    </>
  );
};

const EpisodeWithSuspense: React.FC<Props> = ({ bookId }) => {
  return (
    <Suspense fallback={null}>
      <EpisodeList bookId={bookId} />
    </Suspense>
  );
};

export { EpisodeWithSuspense as EpisodeList };