import { useEffect, useState } from 'react';

import { getImageUrl } from '../../lib/image/getImageUrl';

export const useImage = ({ height, imageId, width }: { height: number; imageId: string; width: number }) => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const fetchImageUrl = async () => {
      const dpr = window.devicePixelRatio;
      const url = getImageUrl({
        format: 'jpg',
        height: height * dpr,
        imageId,
        width: width * dpr,
      });
      setImageUrl(url);
    };

    fetchImageUrl();
  }, [height, imageId, width]);

  return imageUrl;
};
