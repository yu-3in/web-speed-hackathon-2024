import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';
import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

const MIN_VIEWER_HEIGHT = 500;
const MAX_VIEWER_HEIGHT = 650;

const MIN_PAGE_WIDTH = Math.floor((MIN_VIEWER_HEIGHT / IMAGE_HEIGHT) * IMAGE_WIDTH);

const clamp = (num: number, clamp: number, higher: number) =>
  higher ? Math.min(Math.max(num, clamp), higher) : Math.min(num, clamp);

const _Container = styled.div`
  position: relative;
`;

const _Wrapper = styled.div<{
  $maxHeight: number;
}>`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  height: ${({ $maxHeight }) => addUnitIfNeeded($maxHeight)};
  overflow: hidden;
`;

type Props = {
  episodeId: string;
};

export const ComicViewer: React.FC<Props> = ({ episodeId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [viewerSize, setViewerSize] = useState({
    height: MIN_VIEWER_HEIGHT,
    width: 0,
  });

  const updateSize = useCallback(() => {
    if (ref.current == null) return;

    const width = ref.current.getBoundingClientRect().width ?? 0;
    // 1画面に表示できるページ数（1 or 2）
    const pageCountPerView = width <= 2 * MIN_PAGE_WIDTH ? 1 : 2;
    // 1ページの幅の候補
    const candidatePageWidth = width / pageCountPerView;
    // 1ページの高さの候補
    const candidatePageHeight = (candidatePageWidth / IMAGE_WIDTH) * IMAGE_HEIGHT;
    // ビューアの高さ
    const viewerHeight = clamp(candidatePageHeight, MIN_VIEWER_HEIGHT, MAX_VIEWER_HEIGHT);

    setViewerSize({
      height: viewerHeight,
      width,
    });
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return (
    <_Container ref={ref}>
      <_Wrapper $maxHeight={viewerSize.height}>
        <ComicViewerCore episodeId={episodeId} />
      </_Wrapper>
    </_Container>
  );
};
